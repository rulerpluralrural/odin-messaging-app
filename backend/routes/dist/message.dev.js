"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _message = _interopRequireDefault(require("../controllers/message.js"));

var _auth = _interopRequireDefault(require("../middlewares/auth.js"));

var _message2 = _interopRequireDefault(require("../models/message.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var storage = _multer["default"].diskStorage({
  destination: "./public/images/room-images",
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname.replace("-", "_"));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
}); // GET route for all user messages

router.get("/messages", _auth["default"], _message["default"].get_rooms); // POST route for creating a chat room

router.post("/messages", _auth["default"], _message["default"].post_create_room); // DELETE route for deleting chat room

router["delete"]("/messages/:id/delete", _auth["default"], _message["default"].delete_room); // PUT route for updating chat room

router.put("/messages/:id/upload", _auth["default"], upload.single("roomImg"), _message["default"].edit_room); // POST route for sending a message

router.post("/message/:id", _auth["default"], _message["default"].post_send_message); // DELETE route for deleting a message

router["delete"]("/message/:id/delete", _auth["default"], _message["default"].delete_message); // GET route for messages in a chatroom

router.get("/message/:id", _auth["default"], _message["default"].get_messages);
var _default = router;
exports["default"] = _default;