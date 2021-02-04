import os.path
import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.auth
import tornado.options

from tornado.options import define, options
from pymongo import MongoClient
from bson.json_util import dumps
import asyncio
from datetime import datetime
import json
import logging
import requests
from bson.objectid import ObjectId
from bson.binary import Binary


define('port', default=8000, help='run on the given port', type=int)


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [(r"/adduser", MainHandler),
                    (r"/profile/(.*?)", MainHandler), (r"/update", MainHandler), (r'/sendmessage', HandleMessage), (r'/receivemessage', HandleMessage), (r'/users/profile', UsersProfile)]
        conn = MongoClient('mongodb://localhost:27017')
        self.db = conn.get_database('chatdb')
        tornado.web.Application.__init__(self, handlers, debug=True)

# pullTop


class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        print('set headers!!')
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Content-type', 'application/json')
        self.set_header('Access-Control-Allow-Methods',
                        'POST, GET, PUT, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Headers',
                        'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, X-Requested-By, Access-Control-Allow-Methods')

    def options(self):
        pass

    def post(self):

        coll = self.application.db.get_collection('user_profile')

        payload = json.loads(str(self.request.body, 'utf-8'))
        profile = coll.find_one({'email': payload['email'].strip()})

        # photo_binary = Binary(payload['photo_url'])
        if not profile:
            resp = coll.insert_one({'user_name': payload['user_name'],
                                    'email': payload['email'], 'password': payload['password'],
                                    'dob': payload['dob'], 'gender': payload['gender'], 'photo_url': payload['photo_url']})
            message = {
                'status_code': 200,
                'status_ok': 'pass',
                'message': 'User added!'}

        else:

            message = {
                'status_code': 400,
                'status_ok': 'fail',
                'message': 'Email already taken '}

        self.write(message)

    def get(self, email):
        useremail = email.strip()
        coll = self.application.db.get_collection('user_profile')
        user = coll.find_one({'email': useremail})

        if user:
            self.write(dumps(user))
        else:
            message = {
                'status': 400,
                'message': 'Not found'
            }

            self.write(dumps(user))

    def put(self):
        # result = self.prepare()

        coll = self.application.db.get_collection('user_profile')
        payload = json.loads(str(self.request.body, 'utf-8'))
        resp = coll.find_one({'user_name': payload['user_name']})
        id = str(ObjectId(resp['_id']))

        _id = id

        resp = coll.update_one({'_id': ObjectId(_id['$oid'] if '$oid' in _id else ObjectId(_id))},
                               {'$set': {'user_name': payload['user_name'], 'email': payload['email'], 'password': payload['password'], 'gender': payload['gender'], 'photo_url': payload['photo_url'], 'mobile': payload['mobile']}})

        self.write("put message")


class HandleMessage(MainHandler):

    def post(self):

        msg = json.loads(str(self.request.body, 'utf-8'))

        coll = self.application.db.get_collection('messages')
        coll.insert_one(
            {'username': msg['username'], 'id': msg['id'], 'text': msg['text']})

        self.write('post message')

    def get(self):
        coll = self.application.db.get_collection('messages')
        msg = coll.find()

        self.write(dumps(msg))


class UsersProfile(MainHandler):
    def get(self):
        coll = self.application.db.get_collection('user_profile')
        resp = coll.find()
        print(resp)

        if resp:
            self.write(dumps(resp))
        else:
            message = {
                'status': 400,
                'message': 'Error while retreiving users'
            }
            self.write(message)


if __name__ == '__main__':
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


# binary_avatar = Binary(avat)

# user={
#     ...
#     "avatar":avatar,
#     "avatar_file": binary_avatar
#     ...
# }
