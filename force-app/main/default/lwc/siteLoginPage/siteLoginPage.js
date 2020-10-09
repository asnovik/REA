import { LightningElement, api, track, wire } from 'lwc';
import getLogin from '@salesforce/apex/SiteLoginPageControllerLWC.getLogin';
import { NavigationMixin } from 'lightning/navigation';

  
export default class SiteLoginPage extends NavigationMixin(LightningElement) {

    handlerClickLogin(event){
        var username= this.template.querySelector('.username');
        var password = this.template.querySelector('.password');
        getLogin({
            username: username.value, 
            password: password.value
            }).then(result => {
                location.href = result;
            }).catch(error => {
                this.error= error;
            });
        }
}