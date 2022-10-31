# API


---

## Install

    $ git clone
    $ cd app
    $ npm install
    $ npm run start

## Configure app

Open `.env` then edit it with your settings. You will need:

- copy .env.example to .env;;
- configure variable;

## Running the project

For Development:

    $ docker-compose -f docker-compose.dev.yml up -d

For Production:
    
    $ docker-compose -f docker-compose.prod.yml up -d
