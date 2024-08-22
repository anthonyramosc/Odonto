import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {first, takeUntil} from 'rxjs/operators'
import {Subject} from 'rxjs'
import {Router} from '@angular/router'
import {CoreConfigService} from '@core/services/config.service'
import {AuthenticationService} from 'app/auth/service/authentication.service'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-auth-login-v2',
    templateUrl: './auth-login-v2.component.html',
    styleUrls: ['./auth-login-v2.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
    //  Public
    public coreConfig: any
    public loginForm: FormGroup
    public loading = false
    public submitted = false
    public returnUrl: string
    public error = ''
    public passwordTextType: boolean
    // Private
    private _unsubscribeAll: Subject<any>

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     */
    constructor(
        private _coreConfigService: CoreConfigService,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private toastr: ToastrService,
        private _authenticationService: AuthenticationService,
    ) {
        this._unsubscribeAll = new Subject()
        // redirect to home if already logged in
        if (this._authenticationService.currentUserValue) {
            this._router.navigate(['/']);
        }
        // Configure the layout
        this._coreConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                menu: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                customizer: false,
                enableLocalStorage: false
            }
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls
    }

    /**
     * Toggle password
     */
    togglePasswordTextType() {
        this.passwordTextType = !this.passwordTextType
    }

    onSubmit() {
        this.submitted = true

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.error = 'Completar los campos faltantes'
            return
        }

        // Login
        this.loading = true

        this._authenticationService
            .login(this.f.usuario.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data.data === 'INVALID_USER') {
                        this.loading = false;
                        this.error = 'Usuario incorrecto'
                        return;
                    }
                    if (data.data === 'INVALID_PASSWORD') {
                        this.loading = false;
                        this.error = 'Contraseña incorrecta'
                        return;
                    }
                    if (data.data === null){
                        this.loading = false;
                        this.error = 'Usuario y/o contraseña incorrecta'
                        return;
                    }
                    // this.toastr.success(
                    //     'Bienvenid  SGA ! 👋 ', '',
                    //     { toastClass: 'toast ngx-toastr', closeButton: true }
                    // );
                    
                    localStorage.setItem('currentUser', JSON.stringify(data.data));
                    this._router.navigate(['/dashboard']) //Old /home
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                    alert(error + 'No se ha podido cargar la página. Revise su conexión Internet');
                }
            );
    }

// Lifecycle Hooks
// -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit()
        :
        void {
        this.loginForm = this._formBuilder.group({
            //  email: ['', [Validators.required, Validators.email]],
            usuario: ['', Validators.required],
            password: ['', Validators.required]
        })

        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/'

        // Subscribe to config changes
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            this.coreConfig = config
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy()
        :
        void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next()
        this._unsubscribeAll.complete()
    }
}
