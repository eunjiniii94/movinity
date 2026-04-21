const signupBtn = document.querySelector(".signup");

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    location.href = "./index.html";
  });
}

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#password-check");
const nameInput = document.querySelector("#name");
const birthInput = document.querySelector("#birth");
const phoneInput = document.querySelector("#phone");
const codeInput = document.querySelector("#code");

const emailMessage = document.querySelector(".email-message");
const passwordRuleMessage = document.querySelector(".password-rule-message");
const passwordMessage = document.querySelector(".password-message");
const birthMessage = document.querySelector(".birth-message");
const phoneMessage = document.querySelector(".phone-message");

const sendBtn = document.querySelector(".send-btn");
const checkBtn = document.querySelector(".check-btn");
const submitBtn = document.querySelector(".submit-btn");
const signupForm = document.querySelector(".signup-form");

const inputs = document.querySelectorAll(".form-input");
const toggleButtons = document.querySelectorAll(".toggle-password");
const passwordInputs = document.querySelectorAll("#password, #password-check");

// 숫자만 입력
birthInput.addEventListener("input", () => {
  birthInput.value = birthInput.value.replace(/\D/g, "");
});

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
});

codeInput.addEventListener("input", () => {
  codeInput.value = codeInput.value.replace(/\D/g, "");
});

// 비밀번호 눈 아이콘 표시/숨기기
passwordInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const wrap = input.closest(".password-wrap");

    if (input.value.trim() !== "") {
      wrap.classList.add("has-value");
    } else {
      wrap.classList.remove("has-value");
    }
  });
});

// 비밀번호 보기/숨기기
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const targetInput = document.querySelector(`#${targetId}`);
    const icon = button.querySelector(".eye-icon");

    if (targetInput.type === "password") {
      targetInput.type = "text";
      icon.src = "assets/icons/eyeeye.svg";
      icon.alt = "비밀번호 숨기기";
    } else {
      targetInput.type = "password";
      icon.src = "assets/icons/eyeclose.svg";
      icon.alt = "비밀번호 보기";
    }
  });
});

// 전체 검사
function updateButtonState() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const passwordCheckValue = passwordCheckInput.value.trim();
  const nameValue = nameInput.value.trim();
  const birthValue = birthInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const codeValue = codeInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`]).{8,}$/;
  const birthPattern = /^\d{8}$/;
  const phonePattern = /^\d{11}$/;

  const isEmailValid = emailPattern.test(emailValue);
  const isPasswordValid = passwordPattern.test(passwordValue);
  const isPasswordMatch = passwordValue === passwordCheckValue;
  const isBirthValid = birthPattern.test(birthValue);
  const isPhoneValid = phonePattern.test(phoneValue);

  const isFilled =
    emailValue !== "" &&
    passwordValue !== "" &&
    passwordCheckValue !== "" &&
    nameValue !== "" &&
    birthValue !== "" &&
    phoneValue !== "" &&
    codeValue !== "";

  // 버튼 활성화
  sendBtn.disabled = !isPhoneValid;
  checkBtn.disabled = codeValue === "";
  submitBtn.disabled = !(
    isFilled &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordMatch &&
    isBirthValid &&
    isPhoneValid
  );

  // 이메일 메세지
  if (emailValue === "") {
    emailMessage.textContent = "";
  } else if (!isEmailValid) {
    emailMessage.textContent = "올바른 이메일 형식이 아닙니다.";
  } else {
    emailMessage.textContent = "";
  }

  // 비밀번호 규칙 메세지
  if (passwordValue === "") {
    passwordRuleMessage.textContent = "";
  } else if (!isPasswordValid) {
    passwordRuleMessage.textContent =
      "비밀번호는 8자 이상, 특수문자를 포함해야 합니다.";
  } else {
    passwordRuleMessage.textContent = "";
  }

  // 비밀번호 확인 메세지
  if (passwordCheckValue === "") {
    passwordMessage.textContent = "";
  } else if (!isPasswordMatch) {
    passwordMessage.textContent = "비밀번호가 일치하지 않습니다.";
  } else {
    passwordMessage.textContent = "";
  }

  // 생년월일 메세지
  if (birthValue === "") {
    birthMessage.textContent = "";
  } else if (!isBirthValid) {
    birthMessage.textContent = "생년월일 8자리를 입력해 주세요.";
  } else {
    birthMessage.textContent = "";
  }

  // 휴대폰 메세지
  if (phoneValue === "") {
    phoneMessage.textContent = "";
  } else if (!isPhoneValid) {
    phoneMessage.textContent = "휴대폰 번호 11자리를 입력해 주세요.";
  } else {
    phoneMessage.textContent = "";
  }
}

// 입력할 때마다 검사
inputs.forEach((input) => {
  input.addEventListener("input", updateButtonState);
});

// 제출 시 이동
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!submitBtn.disabled) {
    location.href = "./index.html";
  }
});

// 처음 상태 한 번 실행
updateButtonState();
