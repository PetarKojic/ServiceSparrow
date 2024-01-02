// Importing the onsnapshot and types from mobx state tree here so we can use it in our app

import { onSnapshot, types } from 'mobx-state-tree'


// Here we are assigning the data types to each filed of the user data 
const UserModel = types.model('User',
    {
        firstname: types.string,
        lastname: types.string,
        email: types.string,
        password: types.string,
        confirmpassword: types.string,

    }
).actions(self => ({// Here actions are used to update the active state of the user data and the change would be implemented from the fron end side and would be replicated here in the store so it can be changed globallly and can be used further 
    setEmail(value: string) {
        self.email = value
    },
    setFirstname(value: string) {
        self.firstname = value
    },

    setLastname(value: string) {
        self.lastname = value
    },

   
    setconfirmpassword(value: string) {
        self.confirmpassword = value
    },
    setPassword(value: string) {
        self.password = value
    },

   
    aftercreate() { // we will be using it for the data from the apis
        onSnapshot(self, (snapshot) => (
            console.log("snapshot", snapshot)
        ))
        console.log("Ap response")
    }

})).views((self) => ({// The views in mobx state tree are used to perform computations on the store data
    get Totalinfo() {
        return (
            self.email + self.password
        )
    }
}))


const Myuser = UserModel.create({
    //Here we are assigning the default data to all of our datafields 
    firstname: "sssss",
    lastname: "Ssssssss",
    email: "ksks",
    password: "djdndndn",
    confirmpassword: "djdndndn",


})

export default Myuser;

