import axios from 'axios';


 class ApiRequest {
     constructor (BaseUrl) {
        // this.Url = BaseUrl || 'http://localhost/chat-api/public/api'
        this.Url = 'http://localhost/chat-api/public/api'
     }

    // create Normal axios post method without Authorization 

    async post (request) {
        
        try {
            let {data , url} = request;
            url = this.Url + url;
            return await axios.post(url,data);

        } catch (error) {
            console.log(error);
            // throw new Error(error.msg);
        }

    }

    // create axios post request with Authorization
    async PAuth (request) {

        const token = localStorage.getItem('api_token');
        if (token != null ) {

            try {
                let {data , url} = request;
                
                const instance = axios.create({
                    baseURL : this.Url,
                    headers : {
                        'Authorization' : 'Bearer '+token 
                    },  
                });
                return await instance.post(url,data);
            } catch (error) {
                console.log(error);
                // throw new Error(error.msg);
            }
        }
        
    }

    // create axios get method without Authorization
    async get (U) {
        
        try {
            const url = this.Url + U ;

            return await axios.get(url);
        } catch (error) {
            console.log(error);
            // throw new Error(error.msg);
        }

    }

    // create axios Get request with Authorization

    async GAuth (url) {
        const token = localStorage.getItem('api_token');
        if (token != null ) {
            try {
                
                const instance = axios.create({
                    baseURL : this.Url,
                    headers : { 'Authorization' : 'Bearer '+token }
                });
                return await instance.get(url);
            } catch (error) {
                console.log(error);
                // throw new Error(error.msg);
            }
        }
    }

    
    
}

export default new ApiRequest();

