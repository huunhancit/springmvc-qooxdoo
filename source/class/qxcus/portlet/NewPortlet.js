qx.Class.define("qxcus.portlet.NewPortlet",{
	extend :  qx.ui.window.Window,
	construct : function(){
		this.base(arguments);
		this.main();
	},
	members : {
		__user : null,
		__pass : null,
		__jsonLogin : {
			username: null,
			password: null
		},
		main : function (){
			this.setMinWidth(200);
     			this.setMaxWidth(450);
      			this.setMaxHeight(400);
      			this.center();
      			this.setShowClose(true);
     			this.setLayout(new qx.ui.layout.VBox());
     			this.setModal(true);
     			this.add(this._createLoginForm());
		},
		_createLoginForm : function (){
			var layout = new qx.ui.layout.Grid();
			layout.setSpacing(5);
			var cLogin = new qx.ui.container.Composite(layout);
			cLogin.add(new qx.ui.basic.Label("Username : "),{row : 0 , column : 0});
			var txtUser = new qx.ui.form.TextField();
			this.__user = txtUser;
			cLogin.add(txtUser,{row : 0 , column : 1});
			cLogin.add(new qx.ui.basic.Label("Password: "), {row: 1, column: 0});
			var txtPass = new qx.ui.form.TextField();
			this.__pass = txtPass;
			cLogin.add(txtPass, {row: 1, column: 1});
			var btnLogin = new qx.ui.form.Button("Login");
			btnLogin.addListener("execute",this._onLogin,this);
			cLogin.add(btnLogin,{row: 2, column: 1});
			return cLogin;
		},
		_getDataForm: function(){
			this.__jsonLogin.username = this.__user.getValue();
			this.__jsonLogin.password = this.__pass.getValue();
			return this.__jsonLogin;
		},
		_onLogin: function(){
			var req = new qx.io.remote.Request("http://localhost:8080/vital/submit", "POST", "text/plain");
		   	req.setMethod("POST");
			req.setRequestHeader("Content-Type", "application/json");
			req.setData(JSON.stringify(this._getDataForm()));
			req.addListener("completed", function(e) {
			  	alert(e.getContent());
			  // use the following for qooxdoo versions <= 0.6.7:
			  // alert(e.getData().getContent());
			});
			req.send();
		}

	}
});