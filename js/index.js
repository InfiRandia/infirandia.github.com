const media = {
  art: [
    { url: "media/art/2.webp", prioritize: 0 },
    { url: "media/art/4.webp", prioritize: 0 },
    { url: "media/art/p_3.webp", prioritize: 1 },
    { url: "media/art/p_4.webp", prioritize: 1 },
    { url: "media/art/p_2.webp", prioritize: 1 },
    { url: "media/art/5.webp", prioritize: 0 },
    { url: "media/art/p_1.webp", prioritize: 1 },
    { url: "media/art/3.webp", prioritize: 0 },
    { url: "media/art/6.webp", prioritize: 0 },
    { url: "media/art/1.webp", prioritize: 0 },
  ],
  animations: [
    { url: "media/animation/20241228_stopmotion.mp4", prioritize: 0 },
    { url: "media/animation/slime_activation.gif", prioritize: 0 },
  ],
  diy: [
    { url: "media/diy/1.webp", prioritize: 0 },
    { url: "media/diy/2.webp", prioritize: 0 },
  ],
  games: [
    {
      name: "CryptCrusherPrototype",
      desc: "A prototype of a dungeon adventure game where you solve puzzles, defeat monsters and bosses. Your goal is to defeat the a boss. Controller required.",
      files: [
        { url: "media/games/CryptCrusherPrototype/linux.zip" },
        { url: "media/games/CryptCrusherPrototype/windows.zip" },
      ],
      media: [
        {
          url: "media/games/CryptCrusherPrototype/Screenshot_Godot_Engine_202502101100.png",
        },
        {
          url: "media/games/CryptCrusherPrototype/Screenshot_Godot_Engine_202502101102.png",
        },
        {
          url: "media/games/CryptCrusherPrototype/Screenshot_Godot_Engine_202502101104.png",
        },
        {
          url: "media/games/CryptCrusherPrototype/Screenshot_Godot_Engine_202502101107.png",
        },
        { url: "media/games/CryptCrusherPrototype/trailer.mp4" },
      ],
    },
    {
      name: "SlimePong",
      desc: "A simple ping pong game made with the Godot Engine. The overall theme is a cave with slimes.",
      files: [
        { url: "media/games/SlimePong/linux.zip" },
        { url: "media/games/SlimePong/windows.zip" },
      ],
      media: [
        {
          url: "media/games/SlimePong/Screenshot_Godot_Engine_20221210202606.png",
        },
        {
          url: "media/games/SlimePong/Screenshot_Godot_Engine_20221210202623.png",
        },
        {
          url: "media/games/SlimePong/Screenshot_Godot_Engine_20221210202712.png",
        },
        {
          url: "media/games/SlimePong/Screenshot_Godot_Engine_20221210202724.png",
        },
        { url: "media/games/SlimePong/trailer.mp4" },
      ],
    },
  ],
};

class Entry {
  // DO NOT Change this line! It's used as a ref in the script
  constructor(
    id,
    is_big = true,
    category = "",
    href = "",
    img = "",
    text = "",
    name = "",
    media = [],
    files = [],
  ) {
    this.id = id;
    this.is_big = is_big;
    this.category = category;
    this.name = name;
    this.href = href;
    this.img = img;
    this.text = text;
    this.media = media;
    this.files = files;
  }

  get_element() {
    if (this.media.length > 0) {
      var a = document.createElement("a");
      a.classList.add("category_" + this.category);
      a.href = "/game?id=" + this.id;

      var download_gif = document.createElement("img");
      download_gif.className = "download select-pulse";
      download_gif.src = "media/game_download.gif";
      a.appendChild(download_gif);

      var video = document.createElement("video");
      video.autoplay = true;
      video.loop = true;
      video.muted = true;

      for (var s in this.media) {
        var source_data = this.media[s];

        if (source_data.url.indexOf(".mp4") >= 0) {
          var n_source = document.createElement("source");
          n_source.src = source_data.url;
          n_source.type =
            "video/" + source_data.url.substring(source_data.url.length - 3);
          video.appendChild(n_source);
        }
      }

      a.appendChild(video);

      return a;
    } else if (this.text.length == 0 && this.img.length != 0) {
      var loading_wrapper = document.createElement("a");

      loading_wrapper.classList.add("category_" + this.category);

      if (this.img.indexOf(".mp4") >= 0) {
        var video = document.createElement("video");
        loading_wrapper.appendChild(video);
        video.autoplay = true;
        video.loop = true;
        video.muted = true;

        var n_source = document.createElement("source");
        n_source.src = this.img;
        n_source.type = "video/" + this.img.substring(this.img.length - 3);
        video.appendChild(n_source);
        console.log(this.img);
      } else {
        var img = document.createElement("img");
        loading_wrapper.appendChild(img);

        var last_divider = this.img.lastIndexOf("/") + 1;
        //img.addEventListener('load', load_image);
        img.src =
          this.img.substring(0, last_divider) +
          "thumb_" +
          this.img.substring(last_divider);
      }

      return loading_wrapper;
    } else {
      var text_entry = document.createElement("article");

      text_entry.innerHTML = this.text;

      return text_entry;
    }
  }
}

function load_image(target) {
  var placeholder = new Image();
  var full_url = target.src.replace("thumb_", "");

  target.parentNode.classList.toggle("loading");
  target.parentNode.style.minHeight = target.height + "px";

  placeholder.addEventListener("load", function () {
    target.removeEventListener("load", load_image);
    target.src = full_url;
    target.parentNode.classList.toggle("loading");
    target.parentNode.style = "";
  });

  placeholder.src = full_url;
}

function set_media(element) {
  var media_display = document.getElementsByClassName("media-display")[0];
  var video = document.getElementsByTagName("video")[0];
  var img = media_display.getElementsByTagName("img")[0];

  if (element.alt.length > 0) {
    img.style.display = "none";
    video.style.display = "block";
    video.currentTime = 0;
    var video_source = media_display.getElementsByTagName("source")[0];
    var url = element.alt;
    video_source.src = url;
    video_source.type = "video/" + url.substring(url.length - 3);
  } else {
    video.style.display = "none";
    img.style.display = "block";
    img.src = element.src;
  }
}

function file_exists(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();

  return http.status != 404;
}

function get_trailers(media_array) {
  return media_array.filter((media) => media.url.includes(".mp4"));
}

function trigger_videos_mute(btn) {
  var videos = document.getElementsByTagName("video");

  for (var x in videos) {
    var video = videos[x];

    if (video.muted === true) {
      video.muted = false;
    } else if (video.muted === false) {
      video.muted = true;
    }
  }

  var mute_btns = document.getElementsByClassName("mute-btn");

  for (var x in mute_btns) {
    var btn = mute_btns[x];
    btn.classList.toggle("muted");
  }
}

function get_random_int(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

var entries = [];
var big_section = document.getElementsByClassName("big")[0];
var small_section = document.getElementsByClassName("small")[0];

if (big_section) {
  for (var x in media.games) {
    var game = media.games[x];

    entries.push(
      new Entry(
        x,
        true,
        "game",
        "",
        game.media[0].url,
        game.desc,
        game.name,
        game.media,
        game.files,
      ),
    );
  }

  while (media.art.length > 0) {
    var entry = media.art.splice(get_random_int(0, media.art.length - 1), 1)[0];

    entries.push(new Entry(x, entry.prioritize != 0, "art", "", entry.url));
  }

  while (media.animations.length > 0) {
    var entry = media.animations.splice(
      get_random_int(0, media.animations.length - 1),
      1,
    )[0];

    entries.push(
      new Entry(x, entry.prioritize != 0, "animation", "", entry.url),
    );
  }

  while (media.diy.length > 0) {
    var entry = media.diy.splice(get_random_int(0, media.diy.length - 1), 1)[0];

    entries.push(new Entry(x, entry.prioritize != 0, "diy", "", entry.url));
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
  const index = params.get("id") ?? 0;

  var c_game = media.games[index];
  var game_title = document.getElementsByClassName("game-title")[0];
  var game_desc = document.getElementsByClassName("game-desc")[0];
  var media_display = document.getElementsByClassName("media-display")[0];
  var media_video = media_display.getElementsByTagName("video")[0];
  var media_source = document.createElement("source");
  var media_section = document.getElementsByClassName("media")[0];
  var actions_section = document.getElementsByClassName("actions")[0];

  game_title.innerHTML = c_game.name;
  game_desc.innerHTML = c_game.desc;

  var trailer_video = get_trailers(c_game.media)[0];
  media_source.src = trailer_video.url;
  media_source.type =
    "video/" + trailer_video.url.substring(trailer_video.url.length - 3);
  media_video.innerHTML = "";
  media_video.appendChild(media_source);

  media_section.innerHTML = "";
  for (var x in c_game.media.sort(
    (a, b) => a.url.includes(".mp4") < b.url.includes(".mp4"),
  )) {
    var c_media = c_game.media[x];
    var is_video = c_media.url.includes(".mp4");
    var img = document.createElement("img");

    img.src = c_media.url;
    img.onclick = function () {
      set_media(this);
    };
    img.className = is_video ? "video" : "";

    if (is_video) {
      img.alt = c_media.url;
      img.src = "media/play_media.gif";
    }

    media_section.appendChild(img);
  }

  actions_section.innerHTML = "";
  for (var x in c_game.files) {
    var c_file = c_game.files[x];
    var a = document.createElement("a");

    a.className = "button download";
    a.href = c_file.url;

    var img = document.createElement("img");
    img.src = "media/game_download.gif";
    a.appendChild(img);

    var label = document.createElement("span");
    var substr_start = c_file.url.lastIndexOf("/") + 1;
    label.innerHTML = c_file.url.substring(substr_start, c_file.url.length - 4);
    a.appendChild(label);

    a.download = c_file.url.substring(substr_start);

    actions_section.appendChild(a);
  }
}

function find_and_load_all_images() {
  var img_elements = document.getElementsByTagName("img");

  for (var x in img_elements) {
    var img = img_elements[x];
    if (img.src !== undefined && img.src.indexOf("thumb_") >= 0) {
      load_image(img);
    }
  }
}

function load_search_params() {}

function update_search_params() {
  var c_url = new URL(window.location.href);
  var section = document.getElementsByTagName("section")[0];

  if (section.classList !== undefined) {
    var hidden_categories = [];
    for (const value of section.classList.values()) {
      if (
        (typeof value === "string" || value instanceof String) &&
        value.startsWith("hide_")
      ) {
        hidden_categories.push(value.substring(5));
      }
    }

    var url_params = c_url.searchParams;
    url_params.set("hide", hidden_categories.join("|"));
    history.pushState({}, "", c_url.href);
  }
}

var categories = ["art", "animations", "games", "diy"];

function toggle_category(evt) {
  var sections = document.getElementsByTagName("section");
  var target = evt.target;
  const c_category = target.getAttribute("name");

  target.classList.toggle("disabled");

  for (var x in sections) {
    var section = sections[x];

    if (section.classList !== undefined) {
      section.classList.toggle("hide_" + c_category);
    }
  }

  update_search_params();
}

function load_categories() {
  var categories_div = document.getElementsByClassName("categories")[0];

  if (categories_div === null || categories_div === undefined) {
    return;
  }

  var c_url = new URL(window.location.href);
  var url_params = c_url.searchParams;

  for (var x in categories) {
    var category = categories[x];
    var n_btn = document.createElement("button");

    n_btn.setAttribute("name", category);
    n_btn.innerHTML = category;

    n_btn.addEventListener("click", toggle_category);

    categories_div.appendChild(n_btn);

    if (url_params.get("hide") !== null) {
      var hidden_categories = url_params.get("hide").split("|");
      if (hidden_categories.includes(category)) {
        n_btn.click();
      }
    }
  }
}

function footer() {
  var element = document.getElementsByTagName("footer")[0];
  let c_year = new Date().getFullYear();
  element.innerHTML = `Copyright InfiRandia 2022-${c_year}<br />
    All content on this site cannot be published anywhere except by InfiRandia<br />
    All art, games and articles were created by InfiRandia`;
}

window.onload = function () {
  find_and_load_all_images();

  load_categories();
  footer();
};
