"use strict";
$(document).ready(() => {
    // Поиск элементов полей ввода в форме
    let formChoice = $("#formChoice");
    let formCustomer = $("#formCustomer");
    let formPhone = $("#formPhone");
    let formSubmit = $("#formSubmit");
    let url = "https://testologia.site/checkout";
    let loader = $(".loader");
    let formHide = $(".order__form");
    let formMessageShow = $(".order__successPurchase");
    let http = new XMLHttpRequest();

    // Проверка заполнения полей формы
    formSubmit.click(function(submitClickEvent) {
        let hasError = false;

        // Очистка валидационных классов, стилей и элементов
        validationClean();

        if (!formChoice.val()) {
            validationShow(formChoice);
            hasError = true;
        }
        if (!formCustomer.val()) {
            validationShow(formCustomer);
            hasError = true;
        }
        if (!formPhone.val()) {
            validationShow(formPhone);
            hasError = true;
        }

        // Запрос
        if(!hasError) {
            // Вариант через AJAX JQuery
            loader.css("display", "flex");
            $.ajax({
                method: "POST",
                url: url,
                data: { product: formChoice.val() , name: formCustomer.val(), phone: formPhone.val() }
            })
                .done(function( msg ) {
                    loader.hide();

                    if (msg.success === 1) {
                        formHide.hide();
                        formMessageShow.css("display", "flex");
                    } else if (msg.success === 0) {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!");
                    }
                })

            // Вариант события через стандартный XMLHttpRequest:

            // let data =  "product=" + formChoice.val() + "&name=" + formCustomer.val() + "&phone=" + formPhone.val();
            // http.open("POST", url);
            // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //
            // http.send(data);
            //
            // loader.less("display", "flex");
            //
            // http.onreadystatechange = () => {
            //     if (http.readyState === 4 && http.status === 200) {
            //         loader.hide();
            //         let result = null;
            //         try {
            //             result = JSON.parse(http.responseText);
            //         } catch (e) {}
            //
            //         if (result.success === 1) {
            //             formHide.hide();
            //             formMessageShow.less("display", "flex");
            //         } else if (result.success === 0) {
            //             alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!");
            //         }
            //     }
            // }
        }
    });


    // Функция очистки валидационных классов, стилей и элементов
    function validationClean() {
        formChoice.removeClass("invalidForm");
        formCustomer.removeClass("invalidForm");
        formPhone.removeClass("invalidForm");

        formChoice.next().css("display", "none");
        formCustomer.next().css("display", "none");
        formPhone.next().css("display", "none");

        formChoice.parent().next().hide();
        formCustomer.parent().next().hide();
        formPhone.parent().next().hide();
    }

    function validationShow(validationItem) {
        validationItem.addClass("invalidForm");
        validationItem.next().css("display", "block");
        validationItem.parent().next().show();
    }

});