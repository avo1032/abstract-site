class Site {
    constructor() {
        this.boards = [];
    }

    addBoard(board) {
        const _board = board;
        if(this.boards.find(function(board) { return board.boardName === _board.boardName })){
            throw new Error();
        }else{
            this.boards.push(board);
            board.added = true;
        }
        


        // this.boards.push(board);
    }

    findBoardByName(boardName) {
        const _boardName = boardName;

        //Site클래스의 boards안에 boardName과 검색하는 board의 boardName이 같은 값을 찾음.
        // find를 화살표함수가아닌 function 으로 하니까 됬음. 차이점..?
        // return this.boards.find((board) => board.baordName === _boardName) 
        return this.boards.find(function(board) { return board.boardName === _boardName})
    }
}

class Board{
    constructor(name) {
        if(!name){
            throw new Error();
        }else{
            this.boardName = name;
            this.added = false;
            this.articles = [];
        }
    }

    publish(article){
        if(this.added){
            this.articles.push(article);
            article.id = `${this.boardName}-${Math.floor(Math.random()*1000)}`;
            article.createdDate = JSON.stringify(new Date()); // createdDate를 객체가 아닌 문자열로 저장.
            article.published = true;
        }else{
            throw new Error();
        }
    }

    getAllArticles(){
        return this.articles;
    }

    
}

class Article {
    constructor({subject, content, author}){
        if(!subject || !content || !author){
            throw new Error();
        }else{
            this.subject = subject;
            this.content = content;
            this.author = author;
            this.published = false;
            this.comments = [];
            
        }
    }

    reply(comment){
        if(this.published){
            this.comments.push(comment)
            comment.createdDate = JSON.stringify(new Date());
        }else{
            throw new Error();
        }
    }

    getAllComments(){
        return this.comments;
    }

}

class Comment {
    constructor({content, author}){
        if(!content || !author){
            throw new Error();
        }else{
            this.content = content;
            this.author = author;
        }
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
