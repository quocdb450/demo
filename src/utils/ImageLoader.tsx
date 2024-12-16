const imageList = {
    'game.png' : require('../assets/game.png'),
    'clothes.png' : require('../assets/clothes.png'),
    'console.png' : require('../assets/console.png'),
};

export const  loadImages = (fileName: string) =>{
    return imageList[fileName as keyof typeof imageList];
};
