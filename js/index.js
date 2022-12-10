const media = {art: [
{"url": "media/art/_4.png", "prioritize": 1},
{"url": "media/art/9.png", "prioritize": 0},
{"url": "media/art/3.gif", "prioritize": 0},
{"url": "media/art/13.png", "prioritize": 0},
{"url": "media/art/11.png", "prioritize": 0},
{"url": "media/art/6.png", "prioritize": 0},
{"url": "media/art/15.png", "prioritize": 0},
{"url": "media/art/_3.png", "prioritize": 1},
{"url": "media/art/2.gif", "prioritize": 0},
{"url": "media/art/7.png", "prioritize": 0},
{"url": "media/art/5.png", "prioritize": 0},
{"url": "media/art/4.gif", "prioritize": 0},
{"url": "media/art/_1.png", "prioritize": 1},
{"url": "media/art/_2.png", "prioritize": 1},
{"url": "media/art/12.png", "prioritize": 0},
{"url": "media/art/10.png", "prioritize": 0},
{"url": "media/art/_6.png", "prioritize": 1},
{"url": "media/art/_7.png", "prioritize": 1},
{"url": "media/art/_5.gif", "prioritize": 1},
{"url": "media/art/14.png", "prioritize": 0},
{"url": "media/art/1.gif", "prioritize": 0},
{"url": "media/art/8.png", "prioritize": 0},
],games: [
{"name": "SlimePong", "desc": "A simple ping pong game made with the Godot Engine. The overall theme is a cave with slimes.", "files": [
{"url": "media/games/SlimePong/windows.zip"},
{"url": "media/games/SlimePong/linux.zip"},
], "media": [
{"url": "media/games/SlimePong/Screenshot_Godot_Engine_20221210202606.png"},
{"url": "media/games/SlimePong/Screenshot_Godot_Engine_20221210202623.png"},
{"url": "media/games/SlimePong/Screenshot_Godot_Engine_20221210202712.png"},
{"url": "media/games/SlimePong/Screenshot_Godot_Engine_20221210202724.png"},
{"url": "media/games/SlimePong/trailer.mp4"},
]},
]};
// Generated Media Entries ^

class Entry {
  constructor(
    id,
    is_big = true,
    href = '',
    img = '',
    text = '',
    name = '',
    media = [],
    files = []
  ) {
    this.id = id;
    this.is_big = is_big;
    this.name = name;
    this.href = href;
    this.img = img;
    this.text = text;
    this.media = media;
    this.files = files;
  }

  get_element() {
    if (this.media.length > 0) {
      var a = document.createElement('a');
      a.href = './game.html?id=' + this.id;

      var download_gif = document.createElement('img');
      download_gif.className = 'download pulse';
      download_gif.src = 'media/game_download.gif';
      a.appendChild(download_gif);

      var video = document.createElement('video');
      video.className = 'select-pulse';
      video.autoplay = true;
      video.loop = true;
      video.muted = true;

      for (var s in this.media) {
        var source_data = this.media[s];
        var n_source = document.createElement('source');
        n_source.src = source_data.url;
        n_source.type =
          'video/' + source_data.url.substring(source_data.url.length - 3);
        video.appendChild(n_source);
      }

      a.appendChild(video);

      return a;
    } else if (this.text.length == 0 && this.img.length != 0) {
      var img = document.createElement('img');

      img.src = this.img;

      return img;
    } else {
      var text_entry = document.createElement('article');

      text_entry.innerHTML = this.text;

      return text_entry;
    }
  }
}

function set_media(element) {
  var media_display = document.getElementsByClassName('media-display')[0];
  var video = document.getElementsByTagName('video')[0];
  var img = media_display.getElementsByTagName('img')[0];

  if (element.alt.length > 0) {
    img.style.display = 'none';
    video.style.display = 'block';
    video.currentTime = 0;
    var video_source = media_display.getElementsByTagName('source')[0];
    var url = element.alt;
    video_source.src = url;
    video_source.type = 'video/' + url.substring(url.length - 3);
  } else {
    video.style.display = 'none';
    img.style.display = 'block';
    img.src = element.src;
  }
}

function file_exists(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();

  return http.status != 404;
}

function get_trailers(media_array) {
  return media_array.filter((media) => media.url.includes('.mp4'));
}

function trigger_videos_mute(btn) {
  var videos = document.getElementsByTagName('video');

  for (var x in videos) {
    var video = videos[x];

    if (video.muted === true) {
      video.muted = false;
    } else if (video.muted === false) {
      video.muted = true;
    }
  }

  var mute_btns = document.getElementsByClassName('mute-btn');

  for (var x in mute_btns) {
    var btn = mute_btns[x];
    btn.classList.toggle('muted');
  }
}

var entries = [];
var big_section = document.getElementsByClassName('big')[0];
var small_section = document.getElementsByClassName('small')[0];

if (big_section) {
  for (var x in media.art) {
    var art = media.art[x];

    entries.push(new Entry(x, art.prioritize != 0, '', art.url));
  }

  for (var x in media.games) {
    var game = media.games[x];

    entries.push(
      new Entry(
        x,
        true,
        '',
        game.media[0].url,
        game.desc,
        game.name,
        game.media,
        game.files
      )
    );
  }

  for (var x in entries) {
    var entry = entries[x];

    if (entry.is_big) {
      big_section.appendChild(entry.get_element());
    } else {
      small_section.appendChild(entry.get_element());
    }
  }
} else {
  const params = new URLSearchParams(window.location.search);
  const index = params.get('id') ?? 0;

  var c_game = media.games[index];
  var game_title = document.getElementsByClassName('game-title')[0];
  var game_desc = document.getElementsByClassName('game-desc')[0];
  var media_display = document.getElementsByClassName('media-display')[0];
  var media_video = media_display.getElementsByTagName('video')[0];
  var media_source = document.createElement('source');
  var media_section = document.getElementsByClassName('media')[0];
  var actions_section = document.getElementsByClassName('actions')[0];

  game_title.innerHTML = c_game.name;
  game_desc.innerHTML = c_game.desc;

  var trailer_video = get_trailers(c_game.media)[0];
  media_source.src = trailer_video.url;
  media_source.type =
    'video/' + trailer_video.url.substring(trailer_video.url.length - 3);
  media_video.innerHTML = '';
  media_video.appendChild(media_source);

  media_section.innerHTML = '';
  for (var x in c_game.media.sort(
    (a, b) => a.url.includes('.mp4') < b.url.includes('.mp4')
  )) {
    var c_media = c_game.media[x];
    var is_video = c_media.url.includes('.mp4');
    var img = document.createElement('img');

    img.src = c_media.url;
    img.onclick = function () {
      set_media(this);
    };
    img.className = is_video ? 'video' : '';

    if (is_video) {
      img.alt = c_media.url;
      img.src = 'media/play_media.gif';
    }

    media_section.appendChild(img);
  }

  actions_section.innerHTML = '';
  for (var x in c_game.files) {
    var c_file = c_game.files[x];
    var a = document.createElement('a');

    a.className = 'button download';
    a.download = true;
    a.href = c_file.url;

    var img = document.createElement('img');
    img.src = 'media/game_download.gif';
    a.appendChild(img);

    var label = document.createElement('span');
    var substr_start = c_file.url.lastIndexOf('/') + 1;
    label.innerHTML = c_file.url.substring(substr_start, c_file.url.length - 4);
    a.appendChild(label);

    actions_section.appendChild(a);
  }
}
