export function pickRandomAvatar() {

    const avatarImages = [
        require('./../img/man1.jpg'),
        require('./../img/man2.jpg'),
        require('./../img/man3.jpg'),
        require('./../img/man4.jpg'),
        require('./../img/woman1.jpg'),
        require('./../img/woman2.jpg'),
        require('./../img/woman3.jpg'),
        require('./../img/woman4.jpg'),
      ];

    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    return avatarImages[randomIndex];
}