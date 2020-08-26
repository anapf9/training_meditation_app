const app = () => {
  const song = document.querySelector('.song')
  const play = document.querySelector('.play')
  const outline = document.querySelector('.moving-outline circle')
  const video = document.querySelector('.vid-container video')

  //sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  //time display
  const timeDisplay = document.querySelector('.time-display')
  const timeSelect = document.querySelectorAll('.time-select button')
  //get the length de outline
  const outlineLength = outline.getTotalLength()
  // duration
  let fakeDuration = 600
  outline.style.strokeDasharray = outlineLength
  outline.style.strokeDashoffset = outlineLength

  // play sound
  play.addEventListener('click', () => {
    checkPlaying(song)
  })

  //Select Sound
  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time')
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`
    })
  })

  // stop and play sound
  const checkPlaying = song => {
    if (song.paused) {
      song.play()
      video.play()
      play.src = './../svg/pause.svg'
    }
    else {
      song.pause()
      video.pause()
      play.src = './../svg/play.svg'
    }
  }

  // animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime
    let elapsed = fakeDuration - currentTime
    let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60)
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
    outline.style.strokeDashoffset = progress
    // animate text
    timeDisplay.textContent = `${minutes}:${seconds}`
  }
}

app()