import BaseApi from '../base.api';

class SignInApi extends BaseApi {
    private baseUri = '/backend/account';

    async accountSignIn(data: any) {
        return this.request.post(`${this.baseUri}/sign-in/account`, data);
    }
}

export default SignInApi;
