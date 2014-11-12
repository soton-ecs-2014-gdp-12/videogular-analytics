videogular-analytics
====================

Videogular Analytics is a [Videogular](http://videogular.com/) plugin for
sending user interaction data to a server. Used on its own, it will send play,
pause and stop events, but other videogular plugins can also provide
information that will also been sent to the server.

Installation
------------

Videogular Analytics can be installed with Bower:

```
bower install videogular-analytics
```

Usage
-----

When used alone, the videogular-analytics plugin will report play, pause and
stop events. Examples for each of these are given below:

Stop:
```
{
  time: '2014-11-09T22:30:27.408Z',
  name: 'stop',
  details: {
    time: 0
  }
}
```

Play:
```
{
  time: '2014-11-09T22:30:28.610Z',
  name: 'play',
  details: {
    time: 0
  }
}
```

Pause:
```
{
  time: '2014-11-09T22:30:29.874Z',
  name: 'pause',
  details: {
    time: '1970-01-01T00:00:01.125Z'
  }
}
```

All of the messages to the server will be of the following format:

```
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "date": {
      "type": "string"
    },
    "content": {
      "type": "object"
    }
  }
}
```
