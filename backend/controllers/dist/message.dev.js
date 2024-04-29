"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _expressValidator = require("express-validator");

var _httpStatusCodes = require("http-status-codes");

var _message = _interopRequireDefault(require("../models/message.js"));

var _user = _interopRequireDefault(require("../models/user.js"));

var _chatRoom = _interopRequireDefault(require("../models/chatRoom.js"));

var _index = require("../errors/index.js");

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  get_rooms: (0, _expressAsyncHandler["default"])(function _callee(req, res) {
    var rooms, chatRooms, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, room, users;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_chatRoom["default"].find({
              users: {
                $in: [req.user]
              }
            }).populate("users").exec());

          case 2:
            rooms = _context.sent;
            chatRooms = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 7;
            _iterator = rooms[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 18;
              break;
            }

            room = _step.value;
            _context.next = 13;
            return regeneratorRuntime.awrap(_user["default"].find({
              _id: {
                $in: room.users.map(function (user) {
                  return user._id;
                })
              }
            }));

          case 13:
            users = _context.sent;
            chatRooms.push(_objectSpread({}, room.toJSON(), {
              users: users
            }));

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 9;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 27:
            _context.prev = 27;

            if (!_didIteratorError) {
              _context.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(24);

          case 32:
            if (rooms) {
              _context.next = 34;
              break;
            }

            throw new _index.BadRequestError("There are no rooms!");

          case 34:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              chatRooms: chatRooms
            });

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[7, 20, 24, 32], [25,, 27, 31]]);
  }),
  get_messages: (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
    var room;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_chatRoom["default"].findById(req.params.id).populate("messages").populate("messages.sender").exec());

          case 2:
            room = _context2.sent;

            if (room) {
              _context2.next = 5;
              break;
            }

            throw new _index.NotFoundError("There is no room with this id: ".concat(req.params.id));

          case 5:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              room: room
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  }),
  post_create_room: [(0, _expressValidator.check)("roomName").isLength({
    min: 1
  }).withMessage("Chat room name is required."), (0, _expressAsyncHandler["default"])(function _callee3(req, res) {
    var errors, newRoom;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (errors.isEmpty()) {
              _context3.next = 3;
              break;
            }

            throw new _index.BadRequestError(errors.array());

          case 3:
            newRoom = new _chatRoom["default"]({
              name: req.body.roomName,
              users: [{
                _id: req.user._id
              }],
              roomImg: req.body.roomImg,
              messages: []
            });
            _context3.next = 6;
            return regeneratorRuntime.awrap(newRoom.save());

          case 6:
            res.status(_httpStatusCodes.StatusCodes.CREATED).json({
              msg: "Successfully created new room: ".concat(req.body.name)
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  })],
  delete_room: (0, _expressAsyncHandler["default"])(function _callee4(req, res) {
    var roomID;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            roomID = req.params.id;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_chatRoom["default"].findByIdAndDelete({
              _id: roomID
            }));

          case 3:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              msg: "Chatroom has been deleted successfully!"
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  }),
  edit_room: (0, _expressAsyncHandler["default"])(function _callee5(req, res) {
    var room;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            room = {
              roomImg: "/images/room-images/".concat(req.file.filename),
              _id: req.params.id
            };

            if (room) {
              _context5.next = 3;
              break;
            }

            throw new _index.NotFoundError("No user found with this id: ".concat(req.params.id));

          case 3:
            _context5.next = 5;
            return regeneratorRuntime.awrap(_chatRoom["default"].findByIdAndUpdate({
              _id: req.params.id
            }, room));

          case 5:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              msg: "Uploaded Successfully!"
            });

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    });
  }),
  post_send_message: [(0, _expressValidator.check)("message").isLength({
    min: 1
  }).withMessage("Message is required"), (0, _expressValidator.check)("id").isLength({
    min: 1
  }).withMessage("Room ID is required"), (0, _expressAsyncHandler["default"])(function _callee6(req, res) {
    var errors, message, sendMessage;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);
            message = new _message["default"]({
              message: req.body.message,
              sender: req.user._id
            });

            if (errors.isEmpty()) {
              _context6.next = 4;
              break;
            }

            throw new _index.BadRequestError(errors.array());

          case 4:
            _context6.next = 6;
            return regeneratorRuntime.awrap(_chatRoom["default"].findByIdAndUpdate(req.params.id, {
              $push: {
                messages: message
              }
            }, {
              "new": true
            }));

          case 6:
            sendMessage = _context6.sent;
            res.status(_httpStatusCodes.StatusCodes.CREATED).json({
              sendMessage: sendMessage
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    });
  })],
  delete_message: (0, _expressAsyncHandler["default"])(function _callee7(req, res) {
    var messageID, roomID;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            messageID = req.params.id;
            roomID = req.body.roomID;

            if (messageID) {
              _context7.next = 6;
              break;
            }

            throw new _index.NotFoundError("There is no message with this ID: ".concat(messageID));

          case 6:
            if (roomID) {
              _context7.next = 8;
              break;
            }

            throw new _index.NotFoundError("There is no chat room with this ID: ".concat(roomID));

          case 8:
            _context7.next = 10;
            return regeneratorRuntime.awrap(_chatRoom["default"].findByIdAndUpdate(roomID, {
              $pull: {
                messages: {
                  _id: new _mongodb.ObjectId(messageID)
                }
              }
            }, {
              "new": true
            }));

          case 10:
            res.status(_httpStatusCodes.StatusCodes.OK).json({
              msg: "Message has been deleted successfully!"
            });

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    });
  })
};
exports["default"] = _default;