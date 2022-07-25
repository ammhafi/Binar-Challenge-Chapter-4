class Game {
  constructor() {
    this.unsur = [
      {
        id: '1',
        name: 'batu',
        image: '/assets/batu.png',
      },
      {
        id: '2',
        name: 'kertas',
        image: '/assets/kertas.png',
      },
      {
        id: '3',
        name: 'gunting',
        image: '/assets/gunting.png',
      },
    ]
    this.clicked = ''
    this.comClicked = ''
    this.comName = ''
  }

  randomPick(arrUnsur) {
    //menampilkan animasi pemilihan unsur com dengan random
    let timeleft = 3
    let timer = setInterval(function () {
      //pengulangan fungsi dalam interval waktu 1 detik
      timeleft -= 1 //timeleft berkurang tiap fungsi
      this.comClicked = `com-${arrUnsur[timeleft].name}-${arrUnsur[timeleft].id}`
      const elem = document.getElementById(this.comClicked)
      elem.classList.add('klik') //memberi efek bg putih transparan pd pilihan unsur com
      setTimeout(() => {
        elem.classList.remove('klik')
      }, 1000)
      if (timeleft <= 0) {
        //menghentikan pengulangsan fungsi agar tdk terjadi infinite loop
        clearInterval(timer)
      }
    }, 1000)
  }

  getRandomInt(min, max) {
    //method untuk mengembalikan nilai random dari suatu range
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  result(player, computer) {
    //algoritma hasil pertandingan
    const elemCom = document.getElementById('vs')
    elemCom.classList.add('papan-result') //menambahkan papan result permainan
    if (player === computer) {
      elemCom.classList.add('papan-result-draw') //menambahkan papan result dengan warna hijau tua
      elemCom.classList.remove('papan-result')
      elemCom.innerHTML = '<h3 class="text-result">DRAW</h3>'
    } else {
      if (player === 'batu') {
        if (computer === 'gunting') {
          elemCom.innerHTML = '<h3 class="text-result">You Win</h3>'
        } else {
          elemCom.innerHTML = '<h3 class="text-result">Com Win</h3>'
        }
      } else if (player === 'kertas') {
        if (computer === 'batu') {
          elemCom.innerHTML = '<h3 class="text-result">You Win</h3>'
        } else {
          elemCom.innerHTML = '<h3 class="text-result">Com Win</h3>'
        }
      } else if (player === 'gunting') {
        if (computer === 'kertas') {
          elemCom.innerHTML = '<h3 class="text-result">You Win</h3>'
        } else {
          elemCom.innerHTML = '<h3 class="text-result">Com Win</h3>'
        }
      }
    }
  }

  handleClick(id, name) {
    //diakses saat mengklik unsur player, dihubungkan dengan atribut onclick pada DOM variabel player di methode play()
    this.clicked = id
    const elem = document.getElementById(id) //declare elemen yg dipilih
    elem.classList.add('klik') //menambahkan class dengan background putih transparan yang menandai bahwa elemen tsb. telah terpilih
    this.randomPick(this.unsur) //memanggil method randomPick dengan unsur sebagai array parameter
    setTimeout(() => {
      //menjalankan fungsi di bawah dalam 5 detik, memberi waktu untuk method randomPick untuk berjalan dulu
      const indexCom = this.getRandomInt(0, 3) //memanggil fungsi random untuk menentuan pilihan computer
      this.comClicked = `com-${this.unsur[indexCom].name}-${this.unsur[indexCom].id}` //menentukan id dari unsur pilihan computer dengan index yang telah dipilih dengan random (metode getRandomInt)
      this.comName = this.unsur[indexCom].name //sekalian menentukan name dari unsur pilihan computer
      const elemCom = document.getElementById(this.comClicked)
      elemCom.classList.add('klik') //memberikan efek terpilihnya unsur com dengan bg putih transparan
      this.result(name, this.comName) //memanggil method tanding dan menghasilkan result
    }, 5000)
  }

  play() {
    //memulai permainan, memetakan unsur elemen html dengan DOM menggunakan looping berdasarkan unsur constructor
    let player = `<h1>PLAYER</h1>`
    for (let i = 0; i < this.unsur.length; i++) {
      player += `<div class="konten-default" id="player-${this.unsur[i].name}-${this.unsur[i].id}" onclick="mulai.handleClick('player-${this.unsur[i].name}-${this.unsur[i].id}', '${this.unsur[i].name}')"><img class="gambar-game" src="${this.unsur[i].image}" alt="${this.unsur[i].name}" ></div>`
    }
    document.querySelector('#konten-player').innerHTML = player //memetakan konten unsur player

    let com = `<h1>COM</h1>`
    for (let i = 0; i < this.unsur.length; i++) {
      com += `<div class="konten-default" id="com-${this.unsur[i].name}-${this.unsur[i].id}"><img class="gambar-game" src="${this.unsur[i].image}" alt="${this.unsur[i].name}" ></div>`
    }
    document.querySelector('#konten-com').innerHTML = com //memetakan konten unsur com
  }

  refresh() {
    //memulai permainan baru(reload)
    document.location.reload()
  }
}

const mulai = new Game()
mulai.play()
