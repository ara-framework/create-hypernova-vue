'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderVuex = exports.renderVue = exports.Vue = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueServerRenderer = require('vue-server-renderer');

var _hypernova = require('hypernova');

var _hypernova2 = _interopRequireDefault(_hypernova);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Vue = exports.Vue = _vue2['default'];

var renderVue = exports.renderVue = function renderVue(name, Component) {
  return (0, _hypernova2['default'])({
    server: function () {
      function server() {
        return async function (propsData) {
          var vm = new Component({
            propsData: propsData
          });

          var renderer = (0, _vueServerRenderer.createRenderer)();

          var contents = await renderer.renderToString(vm);

          return (0, _hypernova.serialize)(name, contents, propsData);
        };
      }

      return server;
    }(),
    client: function () {
      function client() {
        var payloads = (0, _hypernova.load)(name);
        if (payloads) {
          payloads.forEach(function (payload) {
            var node = payload.node,
                propsData = payload.data;


            var vm = new Component({
              propsData: propsData
            });

            vm.$mount(node.children[0]);
          });
        }

        return Component;
      }

      return client;
    }()
  });
};

var renderVuex = exports.renderVuex = function renderVuex(name, ComponentDefinition, createStore) {
  return (0, _hypernova2['default'])({
    server: function () {
      function server() {
        return async function (propsData) {
          var store = createStore();

          var Component = Vue.extend(Object.assign({}, ComponentDefinition, {
            store: store
          }));

          var vm = new Component({
            propsData: propsData
          });

          var renderer = (0, _vueServerRenderer.createRenderer)();

          var contents = await renderer.renderToString(vm);

          return (0, _hypernova.serialize)(name, contents, { propsData: propsData, state: vm.$store.state });
        };
      }

      return server;
    }(),
    client: function () {
      function client() {
        var payloads = (0, _hypernova.load)(name);
        if (payloads) {
          payloads.forEach(function (payload) {
            var node = payload.node,
                data = payload.data;
            var propsData = data.propsData,
                state = data.state;

            var store = createStore();

            var Component = Vue.extend(Object.assign({}, ComponentDefinition, {
              store: store
            }));

            var vm = new Component({
              propsData: propsData
            });

            vm.$store.replaceState(state);

            vm.$mount(node.children[0]);
          });
        }

        return ComponentDefinition;
      }

      return client;
    }()
  });
};