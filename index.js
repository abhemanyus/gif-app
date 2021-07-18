var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var domContainer = document.querySelector('#gif-app');
var res = {};

var Image = function (_React$Component) {
  _inherits(Image, _React$Component);

  function Image(props) {
    _classCallCheck(this, Image);

    var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.state = {
      url: props.url,
      title: props.title
    };
    return _this;
  }

  _createClass(Image, [{
    key: "render",
    value: function render() {
      var JSX = React.createElement(
        "div",
        { "class": "col" },
        React.createElement(
          "div",
          { "class": "card shadow-sm" },
          React.createElement(
            "a",
            { href: this.state.url, target: "_blank" },
            React.createElement("img", { src: this.state.url,
              alt: this.state.title,
              "class": "card card-img-top img-fluid",
              title: this.state.title })
          )
        )
      );
      return JSX;
    }
  }]);

  return Image;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this2.state = {
      gifs: []
    };
    _this2.getGifs = _this2.getGifs.bind(_this2);
    _this2.getGifs();
    return _this2;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var btnHot = document.getElementById('hot-button');
      var btnTop = document.getElementById('top-button');
      btnHot.addEventListener('click', function () {
        return _this3.getGifs("hot");
      });
      btnTop.addEventListener('click', function () {
        return _this3.getGifs("top");
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this4 = this;

      var btnHot = document.getElementById('hot-button');
      var btnTop = document.getElementById('top-button');
      btnHot.removeEventListener('click', function () {
        return _this4.getGifs("hot");
      });
      btnTop.removeEventListener('click', function () {
        return _this4.getGifs("top");
      });
    }
  }, {
    key: "getGifs",
    value: function getGifs() {
      var _this5 = this;

      var subsec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "hot";

      var myHeaders = new Headers();
      myHeaders.append('Origin', 'https://www.reddit.com');

      var myInit = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
        cache: 'default'
      };

      var myRequest = new Request("https://www.reddit.com/r/gifs/" + subsec + ".json");
      fetch(myRequest, myInit).then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      }).then(function (data) {
        res = data.data.children.slice(2);
        _this5.setState(function (prevState) {
          var gifs = res.map(function (item) {
            var url = item.data.url;
            var title = item.data.title;
            return { url: url, title: title };
          }).filter(function (item) {
            return item.url.endsWith("gif");
          });
          return { gifs: gifs };
        });
      }).catch(console.error);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { "class": "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" },
        this.state.gifs.map(function (item) {
          return React.createElement(Image, { url: item.url, title: item.title });
        })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), domContainer);