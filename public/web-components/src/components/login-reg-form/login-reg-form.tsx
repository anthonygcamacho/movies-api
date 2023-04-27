import { Component, State, Prop, h } from "@stencil/core";
import axios from "axios";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

// Todo: Create password form title and description
// Defaults for: title, description, and error messages
enum DEFAULTS {
  FORM_TYPE = "login",
  FORM_TITLE_LOG_IN = "Log In",
  FORM_DESCRIPTION_LOG_IN = "Log in to manage your API Key.",
  FORM_TITLE_CREATE_ACCOUNT = "Create Account",
  FORM_DESCRIPTION_CREATE_ACCOUNT = "Create account to generate you own API Keys.",
  FORM_TITLE_RESET_PASSWORD = "Reset Password",
  FORM_DESCRIPTION_RESET_PASSWORD = "Receive an email confirmation to reset you password.",
  FORM_TITLE_CREATE_NEW_PASSWORD = "Create New Password",
  FORM_DESCRIPTION_CREATE_NEW_PASSWORD = "Create you new password.",
  EMAIL_INVALID_MESSAGE = "Enter a valid email address.",
  PASSWORD_INVALID_MESSAGE = "Password must be between 8 - 16 characters. No spaces.",
  CONFIRM_PASSWORD_INVALID_MESSAGE = "Confirmation password must match password.",
}

@Component({
  tag: "agcamacho-allinone-auth-v1",
  styleUrl: "./login-reg-form.scss",
  scoped: true,
})
export class LoginRegForm {
  // Input value
  @State() email: string;
  @State() password1: string;
  @State() showPassword1 = false;
  @State() password1Type = "password";
  @State() password2: string;
  @State() showPassword2 = false;
  @State() password2Type = "password";
  @State() submitBtn: string | HTMLElement = "Log in";
  @State() submitBtnDisabled = false;

  // Todo: Create password initial defaults
  // Initial page load defaults
  @State() formType = DEFAULTS.FORM_TYPE as string;
  @State() formTitile = DEFAULTS.FORM_TITLE_LOG_IN as string;
  @State() formDescription = DEFAULTS.FORM_DESCRIPTION_LOG_IN as string;
  @State() emailDisplay = true;
  @State() password1Display = true;
  @State() password2Display = false;
  @State() resetPasswordDisplay = true;
  @State() logInDisplay = false;
  @State() createAccountDisplay = true;

  // Validation
  @State() componentError = false;
  @State() componentErrorMsg: string;
  @State() generalMessageToggle = false;
  @State() generalMessageMsg: string;
  @State() isEmailValid = "";
  @State() isEmailValidMsg: string;
  @State() isPassword1Valid = "";
  @State() isPassword1ValidMsg: string;
  @State() isPassword2Valid = "";
  @State() isPassword2ValidMsg: string;

  // API url and paths
  @Prop() newFormType?: string | null;
  @Prop() apiUrl!: string;
  @Prop() loginPath!: string;
  @Prop() loginRedirectPath!: string;
  @Prop() createUserPath!: string;
  @Prop() createUserRedirectPath!: string;
  @Prop() resetPasswordPath!: string;
  @Prop() createNewPasswordPath!: string;

  // Todo: Create password form title and description
  // Form header defaults
  @Prop() formHeaderIsSet = true;
  @Prop() formHeaderDescriptionIsSet = true;
  @Prop() formTitleLogIn = DEFAULTS.FORM_TITLE_LOG_IN as string;
  @Prop() formDescriptionLogIn = DEFAULTS.FORM_DESCRIPTION_LOG_IN as string;
  @Prop() formTitleCreateAccount = DEFAULTS.FORM_TITLE_CREATE_ACCOUNT as string;
  @Prop() formDescriptionCreateAccount =
    DEFAULTS.FORM_DESCRIPTION_CREATE_ACCOUNT as string;
  @Prop() formTitleResetPassword = DEFAULTS.FORM_TITLE_RESET_PASSWORD as string;
  @Prop() formDescriptionResetPassword =
    DEFAULTS.FORM_DESCRIPTION_RESET_PASSWORD as string;
  @Prop() formTitleCreateNewPassword =
    DEFAULTS.FORM_TITLE_CREATE_NEW_PASSWORD as string;
  @Prop() formDescriptionCreateNewPassword =
    DEFAULTS.FORM_DESCRIPTION_CREATE_NEW_PASSWORD as string;

  // After initial load processes
  connectedCallback() {
    // Check for API URL and Paths
    if (
      !this.apiUrl ||
      !this.loginPath ||
      !this.loginRedirectPath ||
      !this.createUserPath ||
      !this.createUserRedirectPath ||
      !this.resetPasswordPath ||
      !this.createNewPasswordPath
    ) {
      this.componentError = true;
      this.componentErrorMsg =
        "API URL and paths are required. Please refer to documentation for how to apply as attributes.";
    }

    // Set initial log in title and description values
    this.formTitile = this.formTitleLogIn;
    this.formDescription = this.formDescriptionLogIn;

    // Create new password form
    if (this.newFormType) {
      this.formType = this.newFormType;
      this.formTypeSwitch(this.newFormType);
    }
  }

  // Field resets
  resetFields() {
    this.email = "";
    this.isEmailValid = "";
    this.password1 = "";
    this.isPassword1Valid = "";
    this.password2 = "";
    this.isPassword2Valid = "";
    this.generalMessageToggle = false;
  }

  formTypeSwitch(type: string) {
    console.log(type);
    switch (type) {
      case "login":
        this.formTitile = this.formTitleLogIn;
        this.formDescription = this.formDescriptionLogIn;
        this.password1Display = true;
        this.password2Display = false;
        this.resetPasswordDisplay = true;
        this.logInDisplay = false;
        this.createAccountDisplay = true;
        this.submitBtn = "Log in";
        break;
      case "createaccount":
        this.formTitile = this.formTitleCreateAccount;
        this.formDescription = this.formDescriptionCreateAccount;
        this.password1Display = true;
        this.password2Display = true;
        this.resetPasswordDisplay = false;
        this.logInDisplay = true;
        this.createAccountDisplay = false;
        this.submitBtn = "Create";
        break;
      case "resetpassword":
        this.formTitile = this.formTitleResetPassword;
        this.formDescription = this.formDescriptionResetPassword;
        this.password1Display = false;
        this.password2Display = false;
        this.resetPasswordDisplay = false;
        this.logInDisplay = true;
        this.createAccountDisplay = true;
        this.submitBtn = "Reset";
        break;
      case "createnewpassword":
        this.formTitile = this.formTitleCreateNewPassword;
        this.formDescription = this.formDescriptionCreateNewPassword;
        this.emailDisplay = false;
        this.password1Display = true;
        this.password2Display = true;
        this.resetPasswordDisplay = false;
        this.logInDisplay = false;
        this.createAccountDisplay = false;
        this.submitBtn = "Submit";
        break;
      default:
        this.password1Display = true;
        this.password2Display = false;
        this.resetPasswordDisplay = true;
        this.logInDisplay = false;
        this.createAccountDisplay = true;
        this.submitBtn = "Log in";
        break;
    }
  }

  // Todo: add type for create new password
  // Form type toggle
  onToggleFormType = (e: Event, type: string) => {
    e.preventDefault();
    this.formType = type;
    this.resetFields();
    this.formTypeSwitch(type);
  };

  setLocalStorage(key, value) {
    console.log(key);
    console.log(value);
    window.localStorage.setItem(key, value);
  }

  // Form submit
  onSubmitForm(e: Event) {
    e.preventDefault();
    console.log(this.apiUrl);
    console.log(this.loginPath);
    console.log(this.loginRedirectPath);
    console.log(this.createUserPath);
    console.log(this.createUserRedirectPath);
    console.log(this.resetPasswordPath);
    console.log(this.createNewPasswordPath);
    this.submitBtnDisabled = true;
    switch (this.formType) {
      case "login":
        if (this.isFormFieldsEmpty(["email", "password1"])) {
          this.submitBtnDisabled = false;
          return;
        }
        axios
          .post("/auth/login", {
            email: this.email,
            password: this.password1,
          })
          .then((res) => {
            this.setLocalStorage("token", res.data.token);
          })
          .then(() => {
            window.location.href = "/account";
          })
          .catch((err) => {
            console.log(err);
            this.generalMessageToggle = true;
            this.generalMessageMsg = err.response.data.error.message;
            this.submitBtnDisabled = false;
          });
        break;
      case "resetpassword":
        if (this.isFormFieldsEmpty(["email"])) return;
        break;
      case "createaccount":
        if (this.isFormFieldsEmpty(["email", "password1", "password2"])) {
          this.submitBtnDisabled = false;
          return;
        }
        axios
          .post("/users/create", {
            email: this.email,
            password: this.password1,
          })
          .then((res) => {
            this.setLocalStorage("token", res.data.token);
          })
          .then(() => {
            window.location.href = "/account";
          })
          .catch((err) => {
            console.log(err);
            this.generalMessageToggle = true;
            this.generalMessageMsg = err.response.data.error.message;
            this.submitBtnDisabled = false;
          });
        break;
      default:
        break;
    }
  }

  // Check for empty fields on submit form
  isFormFieldsEmpty(fields: string[]): boolean {
    let result = false;
    for (let i = 0; i < fields.length; ++i) {
      if (typeof this[fields[i]] === "undefined" || this[fields[i]] === "") {
        this[`is${capitalizeFirstLetter(fields[i])}Valid`] = "invalid";
        if (!result) result = true;
      }
    }
    return result;
  }

  // https://www.sitepoint.com/html-forms-constraint-validation-complete-guide/
  // On email input validation
  onEmailInput(e: Event) {
    let target = e.target as HTMLInputElement;
    this.email = target.value;
    if (target.validity.typeMismatch) {
      this.isEmailValid = "invalid";
    } else {
      this.isEmailValid = "";
    }
  }

  // On password1 input validation
  onPassword1Input(e: Event) {
    let target = e.target as HTMLInputElement;
    this.password1 = target.value;
    console.log(target.value);
    if (
      target.value.length < 8 ||
      target.value.length > 16 ||
      target.value.indexOf(" ")! >= 0
    ) {
      this.isPassword1Valid = "invalid";
    } else {
      this.isPassword1Valid = "";
    }
  }

  // On password2 input validation
  onPassword2Input(e: Event) {
    let target = e.target as HTMLInputElement;
    this.password2 = target.value;
    if (target.value !== this.password1) {
      this.isPassword2Valid = "invalid";
    } else {
      this.isPassword2Valid = "";
    }
  }

  // Todo: add jsx for create new password
  render() {
    return (
      <div class="login-reg-form">
        {/* Form requirements check */}
        {this.componentError ? (
          <div class="login-reg-form__component-error">
            {this.componentErrorMsg}
          </div>
        ) : (
          ""
        )}

        {/* Header */}
        {this.formHeaderIsSet ? (
          <div class="login-reg-form__header">
            <div class="login-reg-form__header__title">{this.formTitile}</div>
            {this.formHeaderDescriptionIsSet ? (
              <div class="login-reg-form__header__description">
                {this.formDescription}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {/* General messaging */}
        {this.generalMessageToggle ? (
          <div class="login-reg-form__general-message">
            {this.generalMessageMsg}
          </div>
        ) : (
          ""
        )}

        {/* Form */}
        <form
          class="login-reg-form__form"
          onSubmit={this.onSubmitForm.bind(this)}
          novalidate
        >
          {this.emailDisplay ? (
            <div class="login-reg-form__form__input-wrapper">
              <input
                class={"login-reg-form__form__input input " + this.isEmailValid}
                type="email"
                id="email"
                placeholder="Email"
                value={this.email}
                onInput={(e: Event) => this.onEmailInput(e)}
              />
              <div class="login-reg-form__form__input-icon">
                <i class="fa-solid fa-envelope"></i>
              </div>
              {this.isEmailValid != "" ? (
                <div class="login-reg-form__form__validation-msg">
                  {DEFAULTS.EMAIL_INVALID_MESSAGE}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {/* Password 1 */}
          {this.password1Display ? (
            <div class="login-reg-form__form__input-wrapper">
              <input
                class={
                  "login-reg-form__form__input input " + this.isPassword1Valid
                }
                type={this.password1Type}
                id="password1"
                placeholder="Password"
                value={this.password1}
                onInput={(e) => this.onPassword1Input(e)}
              />
              <div class="login-reg-form__form__input-icon-eye">
                {this.showPassword1 ? (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.showPassword1 = false;
                      this.password1Type = "password";
                    }}
                  >
                    <i class="fa-solid fa-eye-slash"></i>
                  </a>
                ) : (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.showPassword1 = true;
                      this.password1Type = "text";
                    }}
                  >
                    <i class="fa-solid fa-eye"></i>
                  </a>
                )}
              </div>
              <div class="login-reg-form__form__input-icon">
                <i class="fa-solid fa-lock"></i>
              </div>
              {this.isPassword1Valid != "" ? (
                <div class="login-reg-form__form__validation-msg">
                  {DEFAULTS.PASSWORD_INVALID_MESSAGE}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {/* Password 2 */}
          {this.password2Display ? (
            <div class="login-reg-form__form__input-wrapper">
              <input
                class={
                  "login-reg-form__form__input input " + this.isPassword2Valid
                }
                type={this.password2Type}
                id="password2"
                placeholder="Confirm password"
                value={this.password2}
                onInput={(e) => this.onPassword2Input(e)}
              />
              <div class="login-reg-form__form__input-icon-eye">
                {this.showPassword2 ? (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.showPassword2 = false;
                      this.password2Type = "password";
                    }}
                  >
                    <i class="fa-solid fa-eye-slash"></i>
                  </a>
                ) : (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      this.showPassword2 = true;
                      this.password2Type = "text";
                    }}
                  >
                    <i class="fa-solid fa-eye"></i>
                  </a>
                )}
              </div>
              <div class="login-reg-form__form__input-icon">
                <i class="fa-solid fa-lock"></i>
              </div>
              {this.isPassword2Valid != "" ? (
                <div class="login-reg-form__form__validation-msg">
                  {DEFAULTS.CONFIRM_PASSWORD_INVALID_MESSAGE}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {/* Submit Btn */}
          <div class="login-reg-form__form__button-wrapper">
            <button
              class="login-reg-form__form__submit button button-blue"
              disabled={this.submitBtnDisabled}
              type="submit"
            >
              {this.submitBtnDisabled ? (
                <div>
                  <i class="fa-solid fa-spinner fa-spin"></i>
                </div>
              ) : (
                <span>{this.submitBtn}</span>
              )}
            </button>
          </div>
        </form>

        {/* Reset Password */}
        {this.resetPasswordDisplay ? (
          <div class="login-reg-form__form__reset-password">
            <a
              href="javascript:void(0)"
              onClick={(e) => this.onToggleFormType(e, "resetpassword")}
            >
              Reset Password
            </a>
          </div>
        ) : (
          ""
        )}

        {/* Back to log in */}
        {this.logInDisplay ? (
          <div class="login-reg-form__form__back-to-login">
            Back to{" "}
            <a
              href="javascript:void(0)"
              onClick={(e) => this.onToggleFormType(e, "login")}
            >
              Log in
            </a>
          </div>
        ) : (
          ""
        )}

        {/* Create Account */}
        {this.createAccountDisplay ? (
          <div class="login-reg-form__form__create-account">
            No account?{" "}
            <a
              href="javascript:void(0)"
              onClick={(e) => this.onToggleFormType(e, "createaccount")}
            >
              Create one
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
