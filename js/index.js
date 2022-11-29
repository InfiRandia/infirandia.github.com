class Entry {
  constructor(is_big = false, img = '', href = '', text = '') {
    this.is_big = is_big;
    this.href = href;
    this.img = img;
    this.text = text;
  }

  get_element() {
    if (this.text.length == 0 && this.img.length != 0) {
      var img = document.createElement('img');

      img.src = this.img;

      return img;
    }
    else {
      var text_entry = document.createElement("article");

      text_entry.innerHTML = this.text;

      return text_entry;
    }
  }
}

const entries = [];
entries.push(new Entry(true, 'Midna.png'));
entries.push(new Entry(true, 'MidnaHorizontal.png'));
entries.push(new Entry(false, 'TestAnimation.gif'));
entries.push(new Entry(false, 'MidnaVertical.png'));

var big_section = document.getElementsByClassName('big')[0];
var small_section = document.getElementsByClassName('small')[0];

for (var x = 0 in entries) {
  var current_entry = entries[x];

  if (current_entry.is_big) {
    big_section.appendChild(current_entry.get_element());
  }
  else {
    small_section.appendChild(current_entry.get_element());
  }
}

//console.log("testing: " + JSON.stringify(entries));
