
import auth from '../assets/auth.png';

export default function Brandbar() {


  return (
    <div className="container d-flex justify-content-between">
      <div className="d-flex mt-3">
        <img src={auth} alt="auth" width="70" height="70" />
        <h2 className="mt-3">auth</h2>
      </div>
    </div>
  );
}
