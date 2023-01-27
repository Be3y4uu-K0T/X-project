import "./styles.css";
import "./signin.css";

export default function App() {
  return (
    <div className="App">
      <form className="form-signin" action="http://localhost:4000/reg">
        <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          name="email"
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <select className="form-control" name="role">
          <option value="CLIENT">CLIENT</option>
          <option value="GUIDE">GUIDE</option>
        </select>
        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> */}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
