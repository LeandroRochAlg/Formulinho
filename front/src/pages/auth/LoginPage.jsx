import "../../styles/auth/loginpagecss.css";
import ButtonComponent from "../../components/ButtonComponent";

const loginPage = () => {
  return (
    <div className="page-body">
      <div className="form-container">

      <div className="form-header">
        <div>
          <img id="f1" src="https://account.formula1.com/images/f1_logo.svg" data-i18n="[alt]nav.logo" alt="Formula1"></img>
        </div>
        <h1>Sign In</h1>
      </div>

      <div className="form-field">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </div>

      <div className="form-submit">
        <ButtonComponent text={"Login"}/>
        <ButtonComponent text={"Register"}/>
      </div>
    </div>
  </div>
  );
};

export default loginPage;