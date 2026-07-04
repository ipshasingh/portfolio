const arr_quotes =[
    "The only limit to our realization of tomorrow is our doubts of today.",
    "The purpose of our lives is to be happy.",
    "Life is what happens when you're busy making other plans.",
    "Get busy living or get busy dying.",
    "You only live once, but if you do it right, once is enough.",
    "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Never let the fear of striking out keep you from playing the game.",
    "Life is never fair, and perhaps it is a good thing for most of us that it is not.",
    "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.",
    "In order to write about life first you must live it.",
    "The big lesson in life, baby, is never be scared of anyone or anything.",
    "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.",
    "Life is not a problem to be solved, but a reality to be experienced.",
    "The unexamined life is not worth living.",
    "Turn your wounds into wisdom.",
    "The way I see it, if you want the rainbow, you gotta put up with the rain.",
    "Do all the good you can, for all the people you can, in all the ways you can, as long as you can.",
    "Don't settle for what life gives you; make life better and build something.",
    "Everything negative – pressure, challenges – is all an opportunity for me to rise.",
    "I like criticism. It makes you strong.",
    "You never really learn much from hearing yourself speak.",
    "Life imposes things on you that you can’t control, but you still have the choice of how you’re going to live through this.",
    "Life is a series of baby steps.",
    "Life is short, and it is up to you to make it sweet.",
    "Live in the sunshine, swim the sea, drink the wild air.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "The greatest pleasure of life is love.",
    "Life is what we make it, always has been, always will be.",
    "Life's tragedy is that we get old too soon and wise too late.",
    "You will face many defeats in life, but never let yourself be defeated.",
    "Never let the fear of striking out keep you from playing the game.",
    "Money and success don’t change people; they merely amplify what is already there.",
    "Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.",
    "Not how long, but how well you have lived is the main thing.",
    "If you want to live a happy life, tie it to a goal, not to people or things.",
    "In order to write about life first you must live it.",
    "The big lesson in life, baby, is never be scared of anyone or anything.",
    "Sing like no one’s listening, love like you’ve never been hurt, dance like nobody’s watching, and live like it’s heaven on earth.",
    "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.",
    "Life is not a problem to be solved, but a reality to be experienced.",
    "The unexamined life is not worth living.",
    "Turn your wounds into wisdom.",
    "The way I see it, if you want the rainbow, you gotta put up with the rain.",
    "Do all the good you can, for all the people you can, in all the ways you can, as long as you can.",
    "Don’t settle for what life gives you; make life better and build something.",
    "Everything negative – pressure, challenges – is all an opportunity for me to rise.",
    "I like criticism. It makes you strong."
];

n= arr_quotes.length;

function quote(){
    x=Math.floor(Math.random()*n);  //returns a random no. from 0 to length of array
    quoteGen = arr_quotes[x];
    const qt = document.getElementById("quote_txt");
    qt.innerHTML = quoteGen;
    
}