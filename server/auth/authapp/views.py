from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users
import re
from django.contrib.auth.hashers import make_password,check_password
import random
from django.core.mail import send_mail
from django.core.cache import cache

def validate_password(password):
    if len(password)<8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r"[a-z]",password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r"[A-Z]",password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r"\d",password):
        return False, "Password must contain at least one number"
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False, "Password must contain at least one special character"
    return True, "Password is valid"

otp_store = {}

@api_view(['POST'])
def get_otp(request):
    
    email = request.data.get('email')
    
    if not email:
        return Response({'error':'Please enter the email'})
    
    if Users.objects.filter(email=email).exists():
        return Response({'error':'Email already exists'})
    
    otp = random.randint(100000, 999999)
    
    # store OTP in cache for 5 minutes
    cache.set(f'otp_{email}', str(otp), timeout=300)

    send_otp_registration(otp, email)
    
    otp_store[email] = otp
    
    print("otp gen : ",otp_store[email])
    
    return Response({'message': f'OTP sent to your email'})
    
    

@api_view(['POST'])
def register(request):
    
    username = request.data.get('userName')
    password = request.data.get('password')
    email = request.data.get('email')
    otp = request.data.get('otp')
    
    if not username or not password or not email or not otp:
        return Response({'error':'Please enter all the fields'})
        
    if Users.objects.filter(email=email).exists():
        return Response({'error':'Email already exists'})
        
    isvalid_password,msg = validate_password(password)
    
    if not isvalid_password:
        return Response({'error':msg})
    
    if not otp_store[email] : return Response({'error':'Otp not found'})
    
    if str(otp_store[email]) != str(otp): 
        return Response({'error':'Invalid Otp'})
        
    user = Users.objects.create(
        username = username,
        email = email,
        password = make_password(password)
    )
    user.save()
    
    del otp_store[email]
    
    return Response({'message':'User registration successfull'})

@api_view(['POST'])
def login(request):
    
    password = request.data.get('password')
    email = request.data.get('email')
    
    if not password or not email:
        return Response({'error':'Please enter all the fields'})
        
    try:
        user = Users.objects.get(email=email)
    except Users.DoesNotExist:
        return Response({'error':'Email is not registered'})
        
    user = Users.objects.get(email=email)
    
    if check_password(password,user.password):
        return Response({'message':'User login successfull','username':{user.username}})
        
    return Response({'error':'Invalid password'})




@api_view(['POST'])
def reset_password(request):
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email is required'})

    try:
        Users.objects.get(email=email)
    except Users.DoesNotExist:
        return Response({'error': 'Email not registered'})

    otp = random.randint(100000, 999999)

    # store OTP in cache for 5 minutes
    cache.set(f'otp_{email}', str(otp), timeout=300)

    send_otp_reset(otp, email)

    return Response({'message': 'OTP sent to your email'})


def send_otp_reset(otp,email):
    send_mail(
        subject='Your password reset OTP Code from Auth App',
        message=f'Hello User, your password reset OTP is {otp}',
        from_email='magendraprasad84@gmail.com',
        recipient_list=[email],
    )
    
def send_otp_registration(otp,email):
    send_mail(
        subject='Your registration OTP Code from Auth App',
        message=f'Hello User, your registration OTP is {otp}',
        from_email='magendraprasad84@gmail.com',
        recipient_list=[email],
    )


@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return Response({'error': 'Email and OTP required'})

    cached_otp = cache.get(f'otp_{email}')

    if not cached_otp:
        return Response({'error': 'OTP expired or not found'})

    if cached_otp != str(otp):
        return Response({'error': 'Invalid OTP'})

    # mark OTP verified
    cache.set(f'otp_verified_{email}', True, timeout=300)

    return Response({'message': 'OTP verified'})

    
@api_view(['POST'])
def change_password(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'All fields required'})

    if not cache.get(f'otp_verified_{email}'):
        return Response({'error': 'OTP not verified'})

    try:
        user = Users.objects.get(email=email)
        user.password = make_password(password)
        user.save()
    except Users.DoesNotExist:
        return Response({'error': 'User not found'})

    # cleanup cache
    cache.delete(f'otp_{email}')
    cache.delete(f'otp_verified_{email}')

    return Response({'message': 'Password reset successful'})




        