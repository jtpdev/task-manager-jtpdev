import envs from './envs';

export default class LoginService {

    login(credentials) {
        return new Promise((resolve, reject) => {
            if (credentials.user == 'admin' && credentials.password == 'admin') {
                resolve ({
                    statusCode: 200,
                    body: {
                        name: 'User',
                        user: 'admin@admin.com'
                    }
                });
            } else {
                reject({
                    statusCode: 500,
                    body: {
                        message: 'incorrect-login'
                    }
                });
            }
        })
    }
}
