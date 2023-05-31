import { useEffect, useState } from "react";
import { useTezosCollectStore } from "api/store";
import { useRouter } from "next/router";

const ContactForm = () => {
  const { login, currentUser, loadUser } = useTezosCollectStore();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("currentUser", currentUser);
    if (currentUser) {
      router.push("/Profile");
    }
  }, [currentUser]);
  const onClickLoginButton = async (e) => {
    setError("");
    e.preventDefault();
    try {
      await login(user);
      if (localStorage.token) {
        try {
          loadUser(localStorage.token);
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;

      setError(errors[0].msg);
      console.log(errors[0].msg);
    }
  };

  const onChangeInput = async (e) => {
    setError("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="contact_form">
            <form action="#" method="post" id="main_contact_form" noValidate>
              <div className="row">
                <div className="col-12">
                  <div id="success_fail_info">
                    {error != "" ? <>{error}</> : <></>}
                  </div>
                </div>
                <div className="col-12 col-md-12">
                  <div
                    className="group"
                    data-aos-delay="300"
                    data-aos="fade-up"
                  >
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      data={user.email}
                      onChange={onChangeInput}
                      onFocus={() => {
                        setError("");
                      }}
                      required
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                  </div>
                </div>
                <div className="col-12">
                  <div
                    className="group"
                    data-aos-delay="500"
                    data-aos="fade-up"
                  >
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      data={user.password}
                      onChange={onChangeInput}
                      onFocus={() => {
                        setError("");
                      }}
                      required
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                  </div>
                </div>
                <div
                  className="col-12 text-center"
                  data-aos-delay="600"
                  data-aos="fade-in"
                >
                  <button
                    type="submit"
                    className="more-btn"
                    onClick={onClickLoginButton}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
