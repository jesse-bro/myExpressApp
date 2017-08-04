var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "Y.O.L.O.",
    "Hey Listen!",
];

exports.getFortune = function () {
    var idx = Math.floor(Math.random() * fortunes.lenght);
    return fortunes[idx];
};