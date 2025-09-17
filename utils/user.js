const userBase = [];

const User = (name, id, room)=>{
    return{
        name,
        id,
        room,
    }
}
const userAdd = (givenUser) => {
    const index = userBase.findIndex(user => (user.id === givenUser.id));
    if(index == -1){
        userBase.push(givenUser)
    }
    
}

const userRemove = (givenUser) => {
    const index = userBase.findIndex(user => (user.id === givenUser.id));
    if(index != -1){
        return userBase.splice(index,1);
         
    }
}

const getUser = (id) => {
    const user = userBase.find(user => (user.id === id))
    
    return user;
}

const getRoomUser = (room) => {
    return userBase.filter(user => user.room === room)
}


export {User, userAdd, userRemove, getRoomUser,getUser};