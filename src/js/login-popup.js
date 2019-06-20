    var link1 = document.querySelector(".header-top__user-btn");
    var link2 = document.querySelector(".header-middle__link.log-in");
    var popup = document.querySelector(".modal-login");
    var overlay = document.querySelector(".modal-overlay");
    var close = document.querySelector(".modal__close-btn");
    var login = popup.querySelector("[name=login]");
    var password = popup.querySelector("[name=password]")
    var form = popup.querySelector("form");
    var storage = localStorage.getItem("login");

    var popup2 = document.querySelector(".modal-sign");
    var linkSign1 = document.querySelector(".header-top__user-btn.new-acc");
    var linkSign2 = document.querySelector(".header-middle__link.sign-in");
    var close2 = document.querySelector(".modal__close-btn.reg");

    link1.addEventListener("click", function (evt) {
      evt.preventDefault();
      popup.classList.add("modal-show");
      overlay.classList.add("modal-show");
      login.focus();
      if (storage) {
        login.value = storage;
        password.focus();
      } else {
        login.focus();
      }
    });

    link2.addEventListener("click", function (evt) {
        evt.preventDefault();
        popup.classList.add("modal-show");
        overlay.classList.add("modal-show");
        login.focus();
        if (storage) {
          login.value = storage;
          password.focus();
        } else {
          login.focus();
        }
    });

    linkSign1.addEventListener("click", function () {
          popup2.classList.add("modal-show");
          overlay.classList.add("modal-show");
          login.focus();
          if (storage) {
            login.value = storage;
            password.focus();
          } else {
            login.focus();
          }
    })
    linkSign2.addEventListener("click", function () {
          popup2.classList.add("modal-show");
          overlay.classList.add("modal-show");
          login.focus();
          if (storage) {
            login.value = storage;
            password.focus();
          } else {
            login.focus();
          }
    })

    overlay.addEventListener("click", function() {
        overlay.classList.remove('modal-show');
        popup.classList.remove("modal-show");
        popup2.classList.remove("modal-show");
    });


    close.addEventListener("click", function (evt) {
      evt.preventDefault();
      popup.classList.remove("modal-show");
      overlay.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    });
     close2.addEventListener("click", function (evt) {
      evt.preventDefault();
      popup2.classList.remove("modal-show");
      popup2.classList.remove("modal-error");
      overlay.classList.remove("modal-show");
    });

    form.addEventListener("submit", function (evt) {
      if (!login.value || !password.value) {
        evt.preventDefault();
        popup.classList.add("modal-error");
      } else {
        if (isStorageSupport) {
        localStorage.setItem("login", login.value);
        }
      }
    }); 

    var isStorageSupport = true;
    var storage = "";

    try {
      storage = localStorage.getItem("login");
    } catch (err) {
      isStorageSupport = false;
    }

    window.addEventListener("keydown", function(evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();

        if (popup.classList.contains("modal-show")) {
          popup.classList.remove("modal-show");
          overlay.classList.remove("modal-show");
          popup.classList.remove("modal-error"); 
          popup2.classList.remove("modal-show");
          popup2.classList.remove("modal-error");
        }
      }
    });