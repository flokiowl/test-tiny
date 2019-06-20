'use strict';

// language and currency lists

var item1 = [
	document.querySelector('.header-top__item.en'),
	document.querySelector('.header-top__link.en')
];
var item2 = [
	document.querySelector('.header-top__item.fr'),
	document.querySelector('.header-top__link.fr')
];
var item3 = [
	document.querySelector('.header-top__item.gm'),
	document.querySelector('.header-top__link.gm')
];
var item4 = [
	document.querySelector('.header-top__item.dollar'),
	document.querySelector('.header-top__link.dollar')
];
var item5 = [
	document.querySelector('.header-top__item.euro'),
	document.querySelector('.header-top__link.euro')
];
var item6 = [
	document.querySelector('.header-top__item.pound'),
	document.querySelector('.header-top__link.pound')
];

item1[1].addEventListener('click', function() {
	item1[0].classList.add('active');
	if (item1[0].classList.contains('active')) {
		item2[0].classList.remove('active');
		item3[0].classList.remove('active');
	}
})
item2[1].addEventListener('click', function() {
	item2[0].classList.add('active');
	if (item2[0].classList.contains('active')) {
		item1[0].classList.remove('active');
		item3[0].classList.remove('active');
	}
})
item3[1].addEventListener('click', function() {
	item3[0].classList.add('active');
	if (item3[0].classList.contains('active')) {
		item1[0].classList.remove('active');
		item2[0].classList.remove('active');
	}
})
item4[1].addEventListener('click', function() {
	item4[0].classList.add('active');
	if (item4[0].classList.contains('active')) {
		item5[0].classList.remove('active');
		item6[0].classList.remove('active');
	}
})
item5[1].addEventListener('click', function() {
	item5[0].classList.add('active');
	if (item5[0].classList.contains('active')) {
		item4[0].classList.remove('active');
		item6[0].classList.remove('active');
	}
})
item6[1].addEventListener('click', function() {
	item6[0].classList.add('active');
	if (item6[0].classList.contains('active')) {
		item4[0].classList.remove('active');
		item5[0].classList.remove('active');
	}
})


//burger (mobile main-nav)

var burgerBtn = document.querySelector('.main-nav__burger');
var menuList = document.querySelector('.main-nav__list');

burgerBtn.addEventListener('click', function() {
  menuList.classList.toggle('main-nav__list--open');
})

//slider 


  //slider dots

var sliderWrap = document.querySelector('.slider__wrapper');

var prev = document.querySelector('.slider__control_left');
var next = document.querySelector('.slider__control_right');

var button1 = document.querySelector('.slider__dot--first');
var button2 = document.querySelector('.slider__dot--second');
var button3 = document.querySelector('.slider__dot--third');


button1.addEventListener('click', function() {
  sliderWrap.style.transform = 'translateX(0%)'; 
  button1.classList.add('dot-active');
  button2.classList.remove('dot-active');
  button3.classList.remove('dot-active');
})
button2.addEventListener('click', function() {
  sliderWrap.style.transform = 'translateX(-100%)'; 
  button2.classList.add('dot-active');
  button1.classList.remove('dot-active');
  button3.classList.remove('dot-active');
})
button3.addEventListener('click', function() {
  sliderWrap.style.transform = 'translateX(-200%)'; 
  button3.classList.add('dot-active');
  button1.classList.remove('dot-active');
  button2.classList.remove('dot-active');
})




	//slider prev/next

var multiItemSlider = (function () {
  return function (selector, config) {
    var
      _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
      _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
      _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
      _items = []; // массив элементов

    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getMin: 0,
      getMax: _items.length - 1,
    }

    var _transformItem = function (direction) {
      if (direction === 'right') {
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
          return;
        }
        if (!_sliderControlLeft.classList.contains('slider__control_show')) {
          _sliderControlLeft.classList.add('slider__control_show');
        }
        if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
          _sliderControlRight.classList.remove('slider__control_show');
        }
        _positionLeftItem++;
        _transform -= _step;
      }
      if (direction === 'left') {
        if (_positionLeftItem <= position.getMin) {
          return;
        }
        if (!_sliderControlRight.classList.contains('slider__control_show')) {
          _sliderControlRight.classList.add('slider__control_show');
        }
        if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
          _sliderControlLeft.classList.remove('slider__control_show');
        }
        _positionLeftItem--;
        _transform += _step;
      }
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
    }

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      var direction = this.classList.contains('slider__control_right') ? 'right' : 'left';
      e.preventDefault();
      _transformItem(direction);
    };

    var _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener('click', _controlClick);
      });
    }

    // инициализация
    _setUpListeners();

    return {
      right: function () { // метод right
        _transformItem('right');
      },
      left: function () { // метод left
        _transformItem('left');
      }
    }

  }
}());

var slider = multiItemSlider('.slider')


