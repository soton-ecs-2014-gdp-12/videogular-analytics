[![Stories in Ready](https://badge.waffle.io/soton-ecs-2014-gdp-12/videogular-questions.png?label=ready&title=Ready)](https://waffle.io/soton-ecs-2014-gdp-12/videogular-questions)

This repository is a plugin for the videogular video player that allows quizs and polls during the playback of videos.

See [videogular questions example](https://github.com/soton-ecs-2014-gdp-12/videogular-questions-example) repository for examples to use with this repsitory.

# Server Comunication

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
