export function pickRandomAvatar() {

    const avatarImages = [
        require('./../img/beaver.jpg'),
        require('./../img/duck.jpg'),
        require('./../img/flamingo.jpg'),
        require('./../img/hen.jpg'),
        require('./../img/kangaroo.jpg'),
        require('./../img/llama.jpg'),
        require('./../img/owl.jpg'),
        require('./../img/penguin.jpg'),
        require('./../img/puma.jpg'),
        require('./../img/rabbit.jpg'),
        require('./../img/sloth.jpg'),
        require('./../img/tucan.jpg'),

      ];

    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    return avatarImages[randomIndex];
}