/* 
 vmxAppBuilder_v0.1.12
 Copyright 2013-2015 vision.ai, LLC. https://vision.ai/
*/
function Detection(a, b, c, d, e, f, g, h) {
    if (null != a && null != a.bb) {
        var i = a;
        a = i.name, b = i.score, c = i.bb[0], d = i.bb[1], e = i.bb[2], f = i.bb[3]
    }
    this.name = a, this.score = b, this.x = c, this.x1 = c, this.x2 = e, this.w = e - c, this.y = d, this.y1 = d, this.y2 = f, this.h = f - d, this.ilearn_class = h, this.line_width = 4, this.time = g ? g : new Date
}
angular.module("vmx.services", []).value("REMOTE_URL", "https://models.vision.ai").value("VMX_USER", {
    user: ""
}), angular.module("vmx", ["vmx.services", "ui.bootstrap", "flow", "frapontillo.bootstrap-switch", "angular-flot", "ui.router"]), angular.module("vmx").config(["$stateProvider", "$urlRouterProvider", function(a, b) {
    b.otherwise("/"), a.state("home", {
        url: "/",
        templateUrl: "/static/partial/home.html"
    }).state("models", {
        url: "/models",
        templateUrl: "/static/partial/models.html"
    }).state("sessions", {
        url: "/sessions",
        templateUrl: "/static/partial/sessions.html"
    })
}]), angular.module("vmx.services").constant("vmx_version", "vmxAppBuilder_v0.1.12");
var vmxApi, VmxApi;
! function() {
    "use strict";
    var a, b = !1,
        c = {},
        d = {};
    VmxApi = function() {
        return this
    };
    var e = function(a, b) {
            this.detections = a, this.params = b
        },
        f = function(a, b, c) {
            if (!d[a]) return this;
            var e = d[a],
                f = b[0].score,
                g = e.onEnter;
            g && f >= g.minScore && ((!g.lastMet || g.lastMet + g.minTime <= c) && g.callback(g.params), g.lastMet = c);
            var h = e.onLeave;
            h && f < h.minScore ? (void 0 === h.startedLeaving && (h.startedLeaving = c), h.canFire && h.startedLeaving + h.minTime <= c && (h.canFire = !1, h.callback(h.params)), h.lastMet = c) : h && (h.canFire = !0, h.startedLeaving = void 0)
        },
        g = function(a, b, c, e, f) {
            f || (f = {});
            var g = f.minScore || .1,
                h = f.minTime || 500,
                i = f.canFire;
            if (d[a] || (d[a] = {}), d[a][b] = {
                    callback: c,
                    params: e,
                    minScore: g,
                    minTime: h,
                    lastMet: void 0,
                    canFire: void 0
                }, "onLeave" === b) {
                var j = d[a].onEnter;
                (j && j.lastMet || i) && (d[a][b].canFire = !0)
            }
        };
    VmxApi.prototype.reset = function() {
        c = {}, d = {}
    }, VmxApi.prototype.select = function(a) {
        return this.selector = a, a && !(this.$selected = c[a]) && (this.$selected = null), this
    }, VmxApi.prototype.processServerResponse = function(a) {
        var b, d = a.detections,
            g = a.detectorParams,
            h = a.name || d[0].name,
            i = a.connectionId,
            j = (new Date).getTime();
        return f(h, d, j), (b = c[h]) ? b[i] = d : (b = new e(d, g), c[h] = {}, c[h][i] = b), this
    }, VmxApi.prototype.onEnter = function(a, b, c) {
        return g(this.selector, "onEnter", a, b, c), this
    }, VmxApi.prototype.onLeave = function(a, b, c) {
        return g(this.selector, "onLeave", a, b, c), this
    }, VmxApi.prototype.everDetected = function(a) {
        if (a) {
            var b = {
                name: "Too many parameters",
                message: "This functin takes no params!"
            };
            throw b
        }
        return null !== this.$selected && !!this.$selected
    }, VmxApi.prototype.getSelector = function() {
        return this.selector
    }, VmxApi.prototype.params = function(a, b) {
        var c = null;
        return c = null === b ? !0 : !1, console.log(this.$selected), this
    }, vmxApi = function(c) {
        return b || (a = new VmxApi, b = !0), c ? a.select(c) : a
    }, vmxApi(), vmxApi.reset = a.reset, vmxApi.processServerResponse = a.processServerResponse, vmxApi.fn = VmxApi.prototype
}(), angular.module("vmx").run(["$templateCache", function(a) {
    "use strict";
    a.put("/static/partial/home.html", '<div class="container" style="position:absolute;width:100%;left:0px;min-height:100%"><div class="row"><div class="row"><div class="col-xs-12 col-md-12 col-lg-12"><vmx-video vname="stooge"></vmx-video></div></div></div></div>'), a.put("/static/partial/models.html", '<div class="container"><div class="row"><div class="col-md-12"><div class="modal-body"><div class="container"><vmx-list-models-panel selectable="false" download="true"></vmx-list-models-panel></div></div></div></div></div>'), a.put("/static/partial/sessions.html", '<div class="container"><div class="row"><vmx-list-sessions></vmx-list-sessions></div></div>'), a.put("/static/partial/vmxAvailableDetectors.html", '<div ng-show="showobj"><div class="cbp-vimenu2"><div style="float:left" ng-repeat="t in all_connections" ng-hide="t.model==null"><img ng-click="toggleDetector(t)" class="clickable availableImage" ng-src="/{{t.model.image}}" ng-class="isAttached(t) ? \'border-green\' : \'border-gray\'" class="text-center"><div ng-show="isAttached(t)" class="text-center" style="position:relative; top:-25px" ng-init="right=true" ng-click="toggleFullView(t); right=!right;"><a href="#"><i class="fa fa-2x" ng-class="right ? \'fa-caret-down\' : \'fa-caret-right\'"></i></a></div></div></div><div ng-show="!selectionMode()" style="position:absolute"><vmx-running-detectors></vmx-running-detectors></div></div>'), a.put("/static/partial/vmxCheckLicenseModal.html", '<div class="modal-header"><nav class="navbar navbar-default"><a class="navbar-brand">Unlicensed VMX</a></nav></div><div class="modal-body"><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-3 col-md-offset-2"><p><a class="btn btn-success btn-lg" target="buyWindow" ng-href="{{buyLink}}">Buy VMX</a></p></div><div class="col-md-4 cold-md-offset-1"><p><a class="btn btn-success btn-lg" target="enterLicenseWindow" ng-href="{{enterLink}}" ng-click="clicked=true">Enter License Key</a></p></div><div class="col-md-1 col-md-offset-1" ng-if="clicked"><p><a class="btn btn-success btn-lg" ng-click="check()"><span><i class="fa fa-refresh" ng-class="{\'fa-spin\': spin}"></i></span></a></p></div></div></div></div></div>'), a.put("/static/partial/vmxCheckLicenseProblemModal.html", '<div class="modal-header"><nav class="navbar navbar-default"><a class="navbar-brand">Error running VMX Server</a></nav></div><div class="modal-body"><div class="row"><div class="col-md-12"><strong>Error Message:</strong> {{errorMessage}}</div></div></div><div class="modal-footer"><button class="btn btn-success btn-lg" ng-click="cancel()">Okay</button></div>'), a.put("/static/partial/vmxCopyrightFooter.html", '<div id="vmxfooter" class="footer"><p class="text-muted text-center"><small>{{version()}}<br><span>&copy; <a href="https://vision.ai" target="_blank">vision.ai</a></span><br></small></p></div>'), a.put("/static/partial/vmxCreateModel.html", '<div style="position: absolute; box-shadow:0 0 12px black;width:800px; margin-left: 15px; background:white" class="panel menuOffsets"><div class="dragbar"><div class="modal-header"><nav class="navbar navbar-default"><a class="navbar-brand"><i class="fa fa-plus"></i> Create Model</a><div class="nav navbar-nav navbar-right text-right" style="float:right"><a class="btn" style="padding:8px 5px" href="/static/docs/VMXAppBuilder/index.html#creating-models" target="_blank"><i class="fa fa-2x fa-question"></i></a> <i class="btn" style="padding:8px 5px" ng-click="createModelVisibility=false"><i class="fa fa-2x fa-times"></i></i></div></nav></div><div class="container"><div class="row"><div class="col-md-6 col-xs-12"><div><div><div class="input-group"><input class="form-control" ng-model="model_name" placeholder="Name" id="create_model_text"> <span class="input-group-btn"><button class="btn btn-primary" ng-class="(has_selections() && is_valid_name(model_name)) ? \'\' : \'disabled\'" id="create_model_button" data-style="zoom-in" ng-click="create_model(model_name);"><span class="fa fa-fw" ng-class="{\'fa-spinner fa-spin\':working, \'fa-flask\':!working}"></span>Create</button> <button class="btn btn-primary" ng-class="(has_selections() && is_valid_name(model_name)) ? \'\' : \'disabled\'" ng-click="show_params=!show_params"><span class="fa fa-cogs fa-fw">&nbsp;</span>Settings</button></span></div></div></div></div></div><div class="row" ng-if="error_message"><div class="col-md-6 col-xs-12 col-lg-6"><span class="alert-danger text-left">Warning: {{error_message}}</span></div></div><br><div class="row"><div ng-if="show_params" class="col-md-6"><vmx-detector-params showbutton="false" to-include="[\'init\']" params="paramsObj"></vmx-detector-params></div></div><div class="row"><div class="col-md-12 col-xs-12"><button class="btn btn-primary clickable" ng-class="is_loaded() ? \'\' : \'disabled\'" ng-click="toggle_selection_mode()"><span class="fa fa-plus fa-fw"></span>Add Example</button><div ng-if="!is_loaded()"><span class="alert-danger text-left">Warning: No video loaded.</span></div><button ng-show="selections.length" class="btn btn-primary clickable" ng-class="(selections.length>0) ? \'\' : \'disabled\'" ng-click="show_selections = !show_selections" ng-cloak>{{(show_selections) ? \'Hide\' : \'Show \'+selections.length}} Examples</button></div></div><br><div ng-show="show_selections && selections.length>0"><div class="row"><div class="col-xs-4 col-md-3 col-lg-2" ng-animate="\'animate\'" ng-repeat="selection in selections"><div class="thumbnail"><caption><div style="text-align:center">{{1+$index}}</div><img ng-src="{{selection.objects[0].icon}}" class="imgborder" style="height:100px; align:center"><div style="text-align:center"><small><a class="btn btn-primary btn-xs" ng-click="remove_selection($index)"><i class="fa fa-times"></i>&nbsp;Delete</a></small></div></caption></div></div></div></div></div></div></div>'), a.put("/static/partial/vmxDetectorParam.html", '<div ng-init="paramcontainer={};paramcontainer.collapse=true" class="param-label-container"><label for="{{param.name}}" class="clickable" ng-click="paramcontainer.collapse = !paramcontainer.collapse; checker(\'top\');"><small ng-class="(param.learning_mode==false && paramsObj.get(\'learn_mode\')==true) ? \'disabled-text\' : \'\'">{{param.alias}} <i ng-class="(paramcontainer.collapse) ? \'fa fa-caret-right\' : \'fa fa-caret-down\'"></i></small></label></div><form role="form" ng-if="!paramcontainer.collapse && (param.learning_mode==true || paramsObj.get(\'learn_mode\')==false)"><div class="control-group" ng-class="(param.current_value==param.value) ? \'success\' : \'warning\'"><div class="form-group"><div class="row" ng-if="param.widget == \'checkbox\'"><div class="col-md-3"><div class="input-group input-group-sm"><span class="input-group-addon"><input type="checkbox" ng-model="param.current_value"></span><div class="form-control">{{(param.current_value) ? \'On\' : \'Off\'}}</div></div></div></div><div class="row" ng-if="param.widget ==\'slider\'"><div class="col-md-12"><input class="form-control input-sm" ng-model="param.current_value"></div><div class="col-md-3"><slider min="param.min_value" max="param.max_value" step-size="{{param.slider_step}}" value="param.current_value"></slider></div></div></div></div></form>'), a.put("/static/partial/vmxDetectorParams.html", '<div class="thumbnail"><h5>Parameters</h5><div class="btn-toolbar" role="toolbar"><div class="btn-group btn-group-sm" ng-if="update_button"><a class="btn btn-primary" ng-class="{\'disabled\':saving_mode}" ng-click="update_current_parameters()">Update Parameters</a></div><div class="btn-group btn-group-sm" ng-if="update_button"><a class="btn btn-default" ng-click="expand_all_params()"><i class="fa" ng-class="(collapse_state) ? \'fa-plus-square\' : \'fa-minus-square\'"></i></a></div></div><vmx-detector-param param="param" ng-repeat="param in params | includeParams: toInclude()"></vmx-detector-param></div>'), a.put("/static/partial/vmxDetectorThumbnail.html", '<div class="thumbnail" ng-class="model.selected  ? \'selected_icon\' : \'\'"><div ng-if="showdownloadlinks" class="text-center"><pre>{{model.uuid}}</pre></div><caption><div class="inline" style="text-align:center"><strong><large>{{model.name}}</large></strong></div><div class="inline" style="text-align:center; height:100px; vertical-align:middle; float:none"><img ng-src="{{image}}" class="img-responsive imgborder center-block" style="margin: auto auto;height:100%"></div><div style="text-align:center"><small><div ng-show="model.num_pos!==undefined"><strong>+</strong>{{model.num_pos}} / <strong>-</strong>{{model.num_neg}}</div><div ng-show="model.size.length==2"><strong>Size:</strong> {{model.size[0]}}x{{model.size[1]}}</div><div ng-if="showdownloadlinks && model.uuid"><strong>Download:</strong><br><a ng-href="{{model.url}}/models/{{model.uuid}}/model.data" download>model.data</a><br><a ng-href="{{model.url}}/models/{{model.uuid}}/compiled.data" download>compiled.data</a><br><a ng-if="!compiled" ng-href="{{model.url}}/models/{{model.uuid}}/data_set.json" download>data_set.json</a> <span ng-if="compiled" href="#">No Dataset</span></div></small></div></caption></div>'), a.put("/static/partial/vmxEditModelButton.html", '<button class="btn btn-xs btn-primary" title="Edit" ng-click="displayModelEditorModal(d.connection)"><i class="fa fa-pencil-square-o fa-fw"></i>Edit</button>'), a.put("/static/partial/vmxEditModelModal.html", '<vmx-edit-model-panel detector="detector" cancelfunction="cancel"></vmx-edit-model-panel>'), a.put("/static/partial/vmxEditModelPanel.html", '<div class="modal-header"><nav class="navbar navbar-default"><a class="navbar-brand"><i class="fa fa-pencil-square-o">&nbsp;Model Editor</i></a><div ng-show="cancelfunction" class="nav navbar-nav navbar-right text-right"><a class="btn" ng-href="/static/docs/VMXAppBuilder/index.html#editing-models" target="_blank"><i class="fa fa-question fa-2x"></i></a> <i class="btn" ng-click="cancelfunction()"><i class="fa fa-times fa-2x"></i></i></div></nav></div><div class="modal-body"><div class="row"><div class="col-md-12 col-xs-12"><div class="alert alert-info"><strong>Instructions:</strong> Click on an example to move it from the negative side to the positive side and vice-versa. The goal is to take bad positives and move them to the negative side. Remember to save the model after you\'re done.</div></div><div class="col-md-12 col-xs-12 text-center"><button class="btn btn-primary" ng-class="{\'disabled\':working}" id="update_model_button" data-style="zoom-in" ng-click="update_model()"><span><i class="fa fa-fw fa-spinner" ng-class="{\'fa-spin\':working}"></i>Update Model</span></button> <button class="btn btn-primary" data-style="zoom-in" ng-init="showSettings=false" ng-click="showSettings=!showSettings"><i class="fa fa-gears"></i>&nbsp;Settings</button></div></div><div class="row" ng-if="showSettings"><div class="col-md-3 col-xs-6 text-center"><div class="input-group"><span class="input-group-addon">Learning Iterations</span> <input class="form-control" ng-model="settings.learn_iterations" type="number"></div></div></div><div class="row"><div class="col-md-6 col-xs-6 positives" style="text-align:center"><div ng-if="container.objects"><h4>Positives ({{filteredpos.length}})</h4><div class="row" ng-if="showSettings"><div class="col-xs-3"><div class="form-group"><label><small>Total</small></label><input class="form-control" type="number" ng-model="settings.max_positives"></div></div><div class="col-xs-3"><div class="form-group"><label><small>Sort Order</small></label><input class="form-control" type="number" ng-model="settings.positives_order"></div></div><div class="col-xs-3"><div class="form-group"><label><small>Min Score</small></label><input class="form-control" ng-model="pos.lowest"></div></div><div class="col-xs-3"><div class="form-group"><label><small>Max Score</small></label><input class="form-control" ng-model="pos.highest"></div></div></div><div class="row"><div class="clickable col-md-3 col-xs-6 thumbnail-container magic-animate apositive" ng-repeat="object in filteredpos = (container.objects | classIs: 1 | orderBy:\'score\' |  scoreIs:\'>\':pos.lowest | scoreIs: \'<\': pos.highest)"><vmx-image-crop score="object.score" image="{{object.image}}" time="{{object.time}}" class="object.class_label"></vmx-image-crop></div></div></div></div><div class="col-md-6 col-xs-6 negatives" style="text-align:center"><div><div ng-if="container.objects"><h4>Negatives ({{filteredneg.length}})</h4><div class="row" ng-if="showSettings"><div class="col-xs-3"><div class="form-group"><label><small>Total</small></label><input class="form-control" type="number" ng-model="settings.max_negatives"></div></div><div class="col-xs-3"><div class="form-group"><label><small>Sort Order</small></label><input class="form-control" type="number" ng-model="settings.negatives_order"></div></div><div class="col-xs-3"><div class="form-group"><label><small>Min Score</small></label><input class="form-control" ng-model="neg.lowest"></div></div><div class="col-xs-3"><div class="form-group"><label><small>Max Score</small></label><input class="form-control" ng-model="neg.highest"></div></div></div><div class="row"><div class="clickable col-md-3 col-xs-6 thumbnail-container magic-animate anegative" ng-repeat="object in filteredneg  = (container.objects | orderBy:\'score\':true | scoreIs:\'>\':neg.lowest | scoreIs: \'<\': neg.highest | classIs:-1)"><vmx-image-crop score="object.score" image="{{object.image}}" time="{{object.time}}" class="object.class_label"></vmx-image-crop></div></div></div></div></div></div></div>'), a.put("/static/partial/vmxImageCrop.html", '<div class="thumbnail" style="text-align:center" ng-class="(class>0) ? \'alert-success\' : \'alert-danger\'"><strong>{{score.toFixed(4)}}</strong><br><img ng-src="{{image}}" style="height:80%; width:80%" ng-click="class=class*-1"><caption><small></small> <a class="btn btn-xs btn-primary" ng-click="class=class*-1"><span ng-class="class<0 ? \'fa fa-arrow-left\' : \'fa fa-arrow-right\'"></span></a> <a class="btn btn-xs btn-primary" ng-click="class=0"><span class="fa fa-times"></span></a></caption></div>'), a.put("/static/partial/vmxLearningThumbnail.html", '<div class="thumbnail" ng-class="model.selected  ? \'selected_icon\' : \'\'"><div ng-if="download" style="word-wrap: break-word">{{model.uuid}}</div><caption><div class="inline" style="text-align:center"><strong><large>{{model.name}}{{model.num_neg===-1 ? \'(compiled)\' : \'\'}}</large></strong></div><div style="text-align:center"><div style="position:relative: width:340px"><flot ng-hide="!params" dataset="dataset2" options="options" height="100px" width="200px"></flot><img ng-if="detector.last_response" ng-src="{{detector.last_response.objects[0].image}}" style="height:85px; position:absolute; top:64px; left:215px; max-width:70px"></div><img ng-if="(showimage==true || showimage==undefined) && model.image && !params" ng-src="{{model.image}}" class="imgborder clickable" style="height:100px; max-width:100px"></div><div style="text-align:center"><small><strong>+</strong>{{model.num_pos}} / <strong>-</strong>{{model.num_neg}}<div ng-if="!params"><strong>Size:</strong> {{model.size[0]}}x{{model.size[1]}}</div></small></div></caption></div>'), a.put("/static/partial/vmxListModelsButton.html", '<a href="#" ng-click="choose_model()"><i class="fa fa-fw fa-2x fa-folder-open"></i><div class="text-center" style="position:relative; top:-55px"><small>Load</small></div></a>'), a.put("/static/partial/vmxListModelsModal.html", '<div class="modal-header" id="model-loader-modal"><nav class="navbar navbar-default"><a class="navbar-brand"><i class="fa fa-folder-open"></i>&nbsp;Load Model</a><div class="nav navbar-nav navbar-right text-right"><a class="btn" href="/static/docs/VMXAppBuilder/index.html#loading-models" target="_blank"><i class="fa fa-question fa-2x"></i></a> <i class="btn" ng-click="cancel()"><i class="fa fa-times fa-2x"></i></i></div></nav></div><div class="modal-body"><div class="container"><vmx-list-models-panel selectable="true"></vmx-list-models-panel></div></div>'), a.put("/static/partial/vmxListModelsPanel.html", '<div class="row"><div class="col-md-12 col-xs-12"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i>&nbsp;Search</span> <input class="form-control" placeholder="Name" ng-model="searchString" ng-init="searchString=\'\'"></div></div><div class="col-md-12 col-xs-12">&nbsp;</div></div><div class="row"><div class="col-md-12 col-xs-12 text-center"><span class="btn" ng-class="sortByName==\'-end_time\' ? \'btn-success\' : \'btn-primary\'" ng-click="sortByName=\'-end_time\'" popover-trigger="mouseenter" popover="Sort by End Time" popover-placement="top"><i class="fa fa-calendar"></i> <i class="fa fa-sort-numeric-desc"></i></span> <span class="btn" ng-class="sortByName==\'start_time\' ? \'btn-success\' : \'btn-primary\'" ng-click="sortByName=\'start_time\'" popover-trigger="mouseenter" popover="Sort by Create Time" popover-placement="top"><i class="fa fa-calendar"></i> <i class="fa fa-sort-numeric-asc"></i></span> <span class="btn" ng-class="sortByName==\'-num_pos\' ? \'btn-success\' : \'btn-primary\'" ng-click="sortByName=\'-num_pos\'" popover-trigger="mouseenter" popover="Sort by Number of Positives" popover-placement="top"><i class="fa fa-plus-circle"></i> <i class="fa fa-sort-numeric-desc"></i></span> <span class="btn" ng-class="sortByName==\'num_pos\' ? \'btn-success\' : \'btn-primary\'" ng-click="sortByName=\'num_pos\'" popover-trigger="mouseenter" popover="Inverse Sort by Number of Positives" popover-placement="top"><i class="fa fa-plus-circle"></i> <i class="fa fa-sort-numeric-asc"></i></span> <span class="btn" ng-class="sortByName==\'name\' ? \'btn-success\' : \'btn-primary\'" ng-click="sortByName=\'name\'" popover-trigger="mouseenter" popover="Alphabetical Sort" popover-placement="top"><i class="fa fa-sort-alpha-asc"></i></span> <span class="btn" ng-class="sortByName==\'-name\' ? \'btn-success\' : \'btn-primary\'" ng-click="sortByName=\'-name\'" popover-trigger="mouseenter" popover="Inverse Alphabetical Sort" popover-placement="top"><i class="fa fa-sort-alpha-desc"></i></span></div></div><br><div class="row"><div ng-if="selectable && choose" class="col-md-12 col-xs-12"><span class="btn btn-primary" ng-click="choose(selections,true)" ng-class="selections.length>0 ? \'\' : \'disabled\'">Load {{selections.length}} models as compiled</span> <span class="btn btn-primary" ng-click="choose(selections,false)" ng-class="selections.length==1 ? \'\' : \'disabled\'">Load {{selections.length}} models</span></div><div class="col-md-12 col-xs-12 text-center"><div class="input-group"><span class="input-group-btn"><button class="btn btn-default" ng-class="{\'disabled\':remote_url.length==0}" type="button" ng-click="update_remote()">Add URL</button></span> <input ng-model="remote_url" class="form-control"></div></div></div><div class="row"><div class="col-md-3"><span></span></div></div><br><div class="row"><div class="col-md-12 col-xs-12"></div></div><div ng-repeat="remote in remotes" class="thumbnail remote_show"><h5>{{remote.url}}<br><span><a class="btn btn-xs btn-info" ng-click="remove_remote(remote.url)"><i class="fa fa-times fa-fw"></i></a></span>({{remote.data.length}} models)</h5><div class="row"><div ng-repeat="model in filteredModels = (remote.data | filter:{name:searchString} | orderBy:sortByName)" class="col-md-2 col-xs-6"><vmx-detector-thumbnail showdownloadlinks="download" model="model" showimage="showimage" ng-class="{\'clickable\' : !download}" ng-click="add_selection(model)"></vmx-detector-thumbnail></div><div ng-hide="filteredModels.length" class="col-md-2 col-xs-6"><div class="alert alert-warning">No models</div></div></div></div><div class="thumbnail"><h5>{{local_url}} ({{models.length}} models)</h5><div class="row"><div ng-repeat="model in filteredModels = models | filter:{name:searchString} | orderBy:sortByName" class="col-md-2 col-xs-6"><vmx-detector-thumbnail showdownloadlinks="download" showimage="showimage" model="model" ng-class="{\'clickable\' : !download}" ng-click="add_selection(model);"></vmx-detector-thumbnail></div></div></div>'), a.put("/static/partial/vmxListSessions.html", '<div class="vmx-wide-modal"><div class="modal-body"><div class="row"><div ng-if="connections.length==0">{{nothing}}</div><div ng-repeat="c in connections" class="col-md-2 col-xs-6 text-center" ng-hide="c.model==null"><small><strong>Session:</strong> {{c.id}}</small><vmx-detector-thumbnail model="c.model"></vmx-detector-thumbnail><span class="btn btn-primary" ng-click="close(c.id)">Close session</span> <a class="btn btn-primary" ng-href="/session/{{c.id}}/log.txt">Open Log</a></div><div ng-repeat="c in connections" class="col-md-2 col-xs-6 text-center" ng-show="c.model==null"><small><strong>Session:</strong> {{c.id}}</small> Empty Session <span class="btn btn-primary" ng-click="close(c.id)">Close session</span> <a class="btn btn-primary" ng-href="/session/{{c.id}}/log.txt">Open Log</a></div></div></div></div>'), a.put("/static/partial/vmxListVideosButton.html", '<a ng-click="external_source_modal()" href="#"><i class="fa fa-fw fa-2x fa-video-camera"></i><div class="text-center" style="position:relative;top:-55px"><small>Video</small></div></a>'), a.put("/static/partial/vmxListVideosModal.html", "<vmx-list-videos-panel></vmx-list-videos-panel>"), a.put("/static/partial/vmxListVideosPanel.html", '<div class="modal-header" id="video-loader-modal"><nav class="navbar navbar-default"><a class="navbar-brand"><i class="fa fa-video-camera"></i>&nbsp;Video Input</a><div class="nav navbar-nav navbar-right text-right"><a class="btn" ng-href="/static/docs/VMXAppBuilder/index.html#video-input" target="_blank"><i class="fa fa-question fa-2x"></i></a> <i class="btn" ng-click="cancel()"><i class="fa fa-times fa-2x"></i></i></div></nav></div><div class="modal-body"><div><div class="row"><div class="col-md-12"><div ng-if="webcam_status.supported&&!webcam_status.permission" class="alert alert-warning"><div class="row"><div class="col-md-1 col-xs-1"><span class="fa-stack fa-lg"><i class="fa fa-video-camera fa-stack-1x"></i> <i class="fa fa-ban fa-stack-2x text-danger"></i></span></div><div class="col-md-11 col-xs-11"><h4>VMX does not have permission to use your webcam. <small>For the best VMX experience, click the camera icon in the Chrome URL toolbar and enable your webcam.</small></h4></div></div></div><div ng-if="webcam_status.supported==false" class="alert alert-warning"><h4><span class="fa-stack fa-lg"><i class="fa fa-video-camera fa-stack-1x"></i> <i class="fa fa-ban fa-stack-2x text-danger"></i></span> The webcam is not supported.<small>For an optimal VMX experience, use Google Chrome from your desktop.<br><strong>{{userAgent}}</strong><br></small></h4></div></div></div><div class="row"><div class="col-md-4 col-xs-12 thumbnail"><h4 class="inline ng-binding" style="text-align:center">Model Library<br><small>Stream model images, in-order or shuffled.</small></h4><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i>&nbsp;Search</span> <input class="form-control" ng-init="searchString.value=\'\'" ng-model="searchString.value"></div><br><div class="container"><div ng-repeat="model in models |filter:{name:searchString.value} | orderBy:name | limitTo:10000" class="col-md-4 col-xs-4 thumbnail clickable" ng-if="!model.meta"><h4 class="ng-binding" style="text-align:center"><small>{{model.name}}</small></h4><img ng-src="/models/{{model.uuid}}/data_set/first.jpg" ng-click="load_imagestream(\'/models/\'+model.uuid+\'/data_set/image.jpg\')" style="width:80%"><div class="text-center"><div class="btn-group" role="group" aria-label="..."><span class="btn btn-xs btn-primary" ng-click="load_imagestream(\'/models/\'+model.uuid+\'/data_set/image.jpg\')"><i class="fa fa-sort-numeric-asc"></i></span> <span class="btn btn-xs btn-primary" ng-click="load_imagestream(\'/models/\'+model.uuid+\'/data_set/random.jpg\')"><i class="fa fa-random"></i></span></div></div></div></div></div><div class="col-xs-12 col-md-4 thumbnail text-center"><div flow-init="{singleFile:true}" flow-file-added="!!{png:1,gif:1,jpg:1,jpeg:1}[$file.getExtension()]"><div class="drop text-center" flow-drop ng-class="dropClass"><h4><a name="image-example" class="anchor" href="#image-example"></a>Upload Image<br><small>Drag and Drop from Desktop or<br>Mobile Device upload (iOS,Android)</small></h4><div flow-btn><div ng-show="!$flow.files.length"><img src="/static/img/no_image.gif" style="width:50%"></div><div ng-show="$flow.files.length"><img flow-img="$flow.files[0]" style="max-width:200px; max-height:200px"></div></div><span class="btn btn-primary btn-xs" ng-show="!$flow.files.length" flow-btn><i class="fa fa-upload"></i>&nbsp;Upload</span> <span class="btn btn-primary btn-xs" ng-show="$flow.files.length" flow-btn><i class="fa fa-upload"></i>&nbsp;New Upload</span> <span class="btn btn-primary btn-xs" ng-show="$flow.files.length" ng-click="getDataURL($flow.files[0])"><i class="fa fa-thumbs-up"></i>&nbsp;Load Image</span></div></div></div><div class="col-md-4 col-xs-12 thumbnail"><form role="form"><div class="form-group"><h4 class="inline ng-binding" style="text-align:center">Enter Image URL<br><small>IP camera or JPEG image</small></h4><textarea type="text" class="form-control" ng-model="input"></textarea></div><div class="text-center"><img ng-src="{{imgsrc}}" ng-click="load_dataurl(input)" style="width:100%"><br><span class="btn btn-primary btn-xs" ng-class="{\'disabled\':!input}" ng-click="imgsrc=input">Preview URL</span> <span class="btn btn-primary btn-xs" ng-class="{\'disabled\':!input}" ng-click="load_dataurl(input)"><i class="fa fa-thumbs-up"></i>&nbsp;Load URL</span><br></div></form></div></div></div></div>'), a.put("/static/partial/vmxOverlayMenu.html", '<div id="overlay-container" style="position:absolute;top:0px;left:0px;z-index:10;opacity:1.0"><ul class="cbp-vimenu" ng-show="!selectionMode() && show_menu()"><li><a href="#" class="icon-logo"><i id="vmx-spinner" style="position: relative;\n    top:5px; visibility: hidden" class="fa fa-4x fa-spinner fa-spin"></i></a><div class="carrot_one"><i ng-click="showobj=!showobj" class="fa fa-2x" ng-class="{\'fa-caret-right\':showobj,\'fa-caret-down\':!showobj}"></i></div><div class="carrot_two"><i ng-click="showmenu=!showmenu" class="fa fa-2x" ng-class="{\'fa-caret-right\':showmenu,\'fa-caret-down\':!showmenu}"></i></div></li><div ng-show="showmenu"><li><vmx-list-models-button></vmx-list-models-button></li><li><a href="#" ng-click="createModelVisibility=!createModelVisibility"><i class="fa fa-fw fa-2x fa-plus"></i><div class="text-center" style="position:relative; top:-55px"><small>Create</small></div></a></li><li><vmx-list-videos-button></vmx-list-videos-button></li><li><a ng-click="toggle_tracker()" href="#"><span class="fa-stack fa-2x"><div ng-show="tracker_mode==0"><i class="fa fa-cogs fa-stack-1x"></i> <i class="fa fa-ban fa-stack-2x text-danger"></i></div><div ng-show="tracker_mode==1||tracker_mode==undefined"><i class="fa fa-cogs fa-stack-1x"></i></div><div ng-show="tracker_mode==2||tracker_mode==3"><i class="fa fa-cogs fa-stack-1x text-success"></i></div></span><div class="text-center" style="position:relative; top:-45px"><small>Tracker</small></div></a></li><li><a ng-init="play=true" ng-click="toggle_video();play=!play" href="#"><span class="fa-stack fa-2x"><div ng-show="!play"><i class="fa fa-play fa-stack-1x"></i> <i class="fa fa-ban fa-stack-2x text-danger"></i></div><div ng-show="play"><i class="fa fa-play fa-stack-1x"></i></div></span><div class="text-center" style="position:relative; top:-45px"><small>Play/Pause</small></div></a></li></div></ul><div ng-show="!selectionMode() && show_menu()"><vmx-available-detectors></vmx-available-detectors></div><div id="create_model_panel" ng-init="createModelVisibility=false" ng-show="!selectionMode() && createModelVisibility" style="position:absolute"><vmx-create-model></vmx-create-model></div></div>'), a.put("/static/partial/vmxRunningDetectors.html", '<div class="menuOffsets" style="position: absolute; margin-left:15px" style="box-shadow:0 0 12px black;width:310px"><div class="list-group" style="width:310px"><div class="list-group-item" ng-repeat="d in running_detectors()" ng-if="d.is_visible"><div style="padding:7"><button type="button" class="close" title="Hide Pane" ng-click="d.is_visible=false" popover-trigger="mouseenter" popover="Hide Pane" popover-placement="right"><i class="fa fa-times fa-fw"></i></button><vmx-edit-model-button ng-if="d.connection.model.num_neg!==-1" detector="d.connection"></vmx-edit-model-button><vmx-save-model-button detector="d.connection"></vmx-save-model-button></div><div class="inner"><div class="detector-collapse-container"><vmx-learning-thumbnail params="d.params" model="d.connection.model" detector="d"></vmx-learning-thumbnail></div></div><div><div class="detector-collapse-params" ng-init="compiled=d.connection.model.num_neg==-1"><div><bs-switch ng-if="!compiled" ng-model="d.params.named_params[\'learn_mode\'].value" type="checkbox" switch-size="mini" switch-label="Learning" switch-on-color="success"></bs-switch><bs-switch ng-model="d.params.crop_mode" type="checkbox" switch-size="mini" switch-label="FastDetect" switch-on-color="success"></bs-switch><a class="btn btn-xs btn-default" ng-click="d.options =!d.options">Options <i class="fa" ng-class="d.options ? \'fa-caret-right\' : \'fa-caret-down\'"></i></a><div ng-if="d.options && !compiled"><small class="text-center">Learning Options</small><br></div><div ng-show="d.options && !compiled" class="btn-group btn-group-xs btn-group-justified" data-toggle="buttons"><label class="btn btn-primary btn-xs" ng-click="set_param($index,\'learn_max_positives\',0)"><input type="radio" name="optionsA" id="optionA1" autocomplete="off">All-</label><label class="btn btn-primary btn-xs active" ng-click="set_param($index,\'learn_max_positives\',1)"><input type="radio" name="optionsA" id="optionA2" autocomplete="off" checked>One+</label><label class="btn btn-primary btn-xs" ng-click="set_param($index,\'learn_max_positives\',100)"><input type="radio" name="optionsA" id="optionA2" autocomplete="off">Many+</label></div></div><div ng-if="d.options"><small class="text-center">Detection Options</small><br><div class="btn-group btn-group-xs btn-group-justified" data-toggle="buttons"><label class="btn btn-primary btn-xs" ng-click="set_param($index,\'max_windows\',1)"><input type="radio" name="optionsZ" id="optionZ1" autocomplete="off"> One</label><label class="btn btn-primary btn-xs active" ng-click="set_param($index,\'max_windows\',100)"><input type="radio" name="optionsZ" id="optionZ1" autocomplete="off" checked> Few</label><label class="btn btn-primary btn-xs" ng-click="set_param($index,\'max_windows\',5000)"><input type="radio" name="optionsZ" id="optionZ1" autocomplete="off"> Many</label></div><small>Display Options</small><div class="btn-group btn-group-xs btn-group-justified" data-toggle="buttons"><label class="btn btn-primary btn-xs" ng-click="set_param($index,\'display_threshold\',-1)"><input type="radio" name="optionsS" id="optionS1" autocomplete="off" ng-class="get_param($index,\'display_threshold\')==-1 ? \'checked\' : \'\'"> Show at -1</label><label class="btn btn-primary btn-xs active" ng-click="set_param($index,\'display_threshold\',0)"><input type="radio" name="optionsS" id="optionS2" autocomplete="off" ng-class="get_param($index,\'display_threshold\') == 0 ? \'checked\' : \'\'"> Show at 0</label></div></div><div ng-if="d.options" class="param-expander-container"><div class="btn-group btn-group-xs btn-group-justified"><a class="btn btn-default" ng-click="d.show_params=!d.show_params">Params&nbsp; <i class="fa fa-fw" ng-class="{\'disabled\':get_param($index,\'learn_mode\'), \'fa-caret-right\':(params_collapse[$index]),\'fa-caret-down\':(!param_collapse[$index])}"></i></a></div><div ng-if="d.show_params"><vmx-detector-params to-include="[\'det\']" params="d.params"></vmx-detector-params></div></div></div></div></div></div></div>'), a.put("/static/partial/vmxSaveModelButton.html", '<button class="btn btn-xs btn-primary" title="Save" ng-click="open_save_modal(d)"><i class="fa fa-save fa-fw"></i>Save</button>'), a.put("/static/partial/vmxSaveModelModal.html", '<vmx-save-model-panel detector="detector" cancelfunction="cancel"></vmx-save-model-panel>'), a.put("/static/partial/vmxSaveModelPanel.html", '<div class="modal-header"><nav class="navbar navbar-default"><a class="navbar-brand"><i class="fa fa-save"></i> Save Model</a><div ng-show="cancelfunction" class="nav navbar-nav navbar-right text-right"><a class="btn" ng-href="/static/docs/VMXAppBuilder/index.html#saving-models" target="_blank"><i class="fa fa-question fa-2x"></i></a> <i class="btn" ng-click="cancelfunction()"><i class="fa fa-times fa-2x"></i></i></div></nav></div><div class="modal-body" ng-click="clicked=true"><div class="row"><div class="col-md-6"><vmx-detector-thumbnail model="detector.model"></vmx-detector-thumbnail><img ng-src="{{image}}" style="width:200px"></div><div class="col-md-6"><div class="input-group"><span class="input-group-addon">Model Name</span> <input class="form-control" placeholder="Name" ng-init="input_name=detector.model.name" ng-model="input_name"></div></div><br><div class="col-md-12 text-center"><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn btn-primary" ng-class="waiting ? \'disabled\' : \'\'" ng-click="save(input_name,true)">Copy and Save</button> <button type="button" class="btn btn-primary" ng-class="waiting ? \'disabled\' : \'\'" ng-click="save(input_name,false)">Save Model</button></div></div><div class="col-md-12" ng-if="waiting">Saving <i class="fa fa-cog fa-spin fa-4x"></i><br><progressbar class="progress-striped active" max="progress_max" value="progress_dynamic"><span style="color:black; white-space:nowrap">{{progress_dynamic}} / {{progress_max}}</span></progressbar></div></div></div>'), a.put("/static/partial/vmxTracker.html", '<canvas id="{{trackerId}}" ng-class="selection_mode ? \'pointer_crosshair\' : \'pointer_default\'" style="position:absolute;left:0px;top:0px;z-index:4"></canvas>'), a.put("/static/partial/vmxVideo.html", '<div id="{{mainId}}" style="position:relative"><video id="{{videoId}}" ng-style="videoStyle"></video><canvas id="{{canvasId}}" style="position:absolute;left:0px;top:0px; z-index:4"></canvas><vmx-tracker></vmx-tracker></div><vmx-check></vmx-check><vmx-overlay-menu></vmx-overlay-menu>')
}]), Detection.prototype.inside = function(a, b, c) {
    return c = 0 | c, a >= this.x1 - c && a <= this.x2 + c && b >= this.y1 - c && b <= this.y2 + c
}, Detection.prototype.inferColor = function() {
    var a = [0, 1, 0, 1],
        b = [1, 1, 0, 1],
        c = [1, 0, 0, 1],
        d = this.score;
    null == d && (d = 1), d > 1 && (d = 1), -1 > d && (d = -1);
    var e = [0, 0, 0, 0],
        f = 0;
    if (0 > d)
        for (d += 1, f = 0; 4 > f; ++f) e[f] = c[f] * (1 - d) + b[f] * d, e[f] = Math.round(255 * e[f]);
    else
        for (f = 0; 4 > f; ++f) e[f] = b[f] * (1 - d) + a[f] * d, e[f] = Math.round(255 * e[f]);
    var g = "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + e[3] / 255 + ")";
    return g
}, Detection.prototype.draw = function(a) {
//    a.scale(-1,1);
    a.save();
//    a.scale(1,1);
    var b = this.inferColor();
    if (this.fillStyle = b, this.ilearn_class && 0 !== this.ilearn_class && (a.lineWidth = 0, a.fillStyle = 1 === this.ilearn_class ? "rgba(0,255,0,0.15)" : "rgba(255,0,0,0.15)", a.fillRect(this.x, this.y, this.w, this.h)), a.fillStyle = b, a.lineWidth = this.line_width, a.strokeStyle = b, a.strokeRect(this.x, this.y, this.w, this.h), this.line_width > 1 && this.name) {
        var c = this.name;
        this.score && (c = c + ":" + this.score.toFixed(2)), a.font = "10px Courier";
        var d = a.measureText(c).width + this.line_width,
            e = 10;
        a.fillRect(this.x - this.line_width / 2, this.y - e - this.line_width / 2 + 1, d, e), a.fillStyle = "rgb(0,0,0)", a.fillText(c, this.x, this.y - a.lineWidth), a.scale(2,2);
    }
    a.restore()
};
var GridTracker;
GridTracker = function(a, b, c, d) {
        "use strict";

        function e(a, b) {
            var c = Math.max(a.x1, b.x1),
                d = Math.max(a.y1, b.y1),
                e = Math.min(a.x2, b.x2),
                f = Math.min(a.y2, b.y2),
                g = e - c,
                h = f - d;
            if (0 > g || 0 > h) return 0;
            var i = g * h,
                j = a.w * a.h,
                k = b.w * b.h,
                l = i / (j + k - i);
            return l > 1 && console.log("too big"), .3 > l && (i / j > .99 || i / k > .99) && (l = 1), a.name !== b.name && a.score > 0 && b.score > 0 && (l = 0 * l), l
        }

        function f(a, b, c, d) {
            a.beginPath(), a.arc(b, c, d, 0, 2 * Math.PI, !0), a.closePath(), a.fill()
        }

        function g(a, b, c, d, e) {
            var f = {},
                g = m(a, b, c, d),
                h = n,
                l = k(g, h, e),
                o = h(g, a, b),
                p = i(c, d, o.x, o.y),
                q = j(o.x, o.y, c, d);
            return f.xform = g, f.error = p, f.det = l, f.newpoints = o, f.errors = q, f
        }

        function h(a, b, c, d, e) {
            if (A === !0) return g(a, b, c, d, e);
            var f = {},
                h = p(a, b, c, d),
                m = l,
                n = k(h, m, e),
                o = m(h, a, b),
                q = i(c, d, o.x, o.y),
                r = j(o.x, o.y, c, d);
            return f.xform = h, f.error = q, f.det = n, f.newpoints = o, f.errors = r, f
        }

        function i(a, b, c, d) {
            for (var e = 0, f = 0; f < a.length; ++f) {
                var g = a[f] - c[f],
                    h = b[f] - d[f];
                e = e + g * g + h * h
            }
            return e = Math.sqrt(e / a.length)
        }

        function j(a, b, c, d) {
            for (var e = [], f = 0; f < a.length; ++f) {
                var g = a[f] - c[f],
                    h = b[f] - d[f];
                e[f] = g * g + h * h
            }
            return e
        }

        function k(a, b, c) {
            var d = c,
                e = b(a, [d.x1], [d.y1]),
                f = b(a, [d.x2], [d.y2]);
            return d.x1 = e.x[0], d.x2 = f.x[0], d.y1 = e.y[0], d.y2 = f.y[0], d
        }

        function l(a, b, c) {
            var d = {};
            d.x = new Array(b.length), d.y = new Array(c.length);
            for (var e = 0; e < b.length; ++e) d.x[e] = a.s_1 * (b[e] - a.x_1.mean) + a.x_1.mean + a.dx, d.y[e] = a.s_2 * (c[e] - a.y_1.mean) + a.y_1.mean + a.dy;
            return d
        }

        function m(a, b, c, d) {
            var e, f = new jsfeat.motion_model.affine2d,
                g = new jsfeat.matrix_t(3, 3, jsfeat.F32_t | jsfeat.C1_t),
                h = new Array(a.length),
                i = new Array(a.length);
            for (e = 0; e < a.length; ++e) h[e] = {
                x: a[e],
                y: b[e]
            }, i[e] = {
                x: c[e],
                y: d[e]
            };
            f.run(h, i, g, a.length);
            var j = g.data;
            return isNaN(j[0]) ? void console.log("isnan in xform estimation") : j
        }

        function n(a, b, c) {
            var d = {};
            d.x = new Array(b.length), d.y = new Array(c.length);
            for (var e = 0; e < b.length; ++e) d.x[e] = a[0] * b[e] + a[1] * c[e] + a[2], d.y[e] = a[3] * b[e] + a[4] * c[e] + a[5];
            return d
        }

        function o(a) {
            var b = a.length,
                c = {};
            if (c.std = 1, c.mean = 0, 0 === b) return c;
            for (var d = 0, e = 0, f = 0; b > f; ++f) d += a[f], e += a[f] * a[f];
            var g = d / b,
                h = e / b - g * g;
            return c.std = Math.sqrt(h), c.mean = g, c
        }

        function p(a, b, c, d) {
            var e = o(a),
                f = o(c),
                g = o(b),
                h = o(d),
                i = f.std / e.std,
                j = h.std / g.std;
            i = (i + j) / 2, j = i, a.length < 4 && (i = 1, j = 1);
            var k = 1.05,
                l = 1 / k;
            i > k && (i = k), j > k && (j = k), l > i && (i = l), l > j && (j = l);
            var m = f.mean - e.mean,
                n = h.mean - g.mean,
                p = {};
            return p.x_1 = e, p.y_1 = g, p.x_2 = f, p.y_2 = h, p.s_1 = i, p.s_2 = j, p.dx = m, p.dy = n, p
        }

        function q(a, b) {
            this.max_history_length = 100, this.global_bb = a, this.time_history = [], this.point_history = [], this.id_history = [], this.iteration = 1, this.num_points = b, this.point_status = new Uint8Array(this.num_points), this.prev_xy = new Float32Array(2 * this.num_points), this.curr_xy = new Float32Array(2 * this.num_points), this.good_counts = new Array(b), this.object_counts = new Array(b), this.track_ids = new Array(b);
            var c;
            for (c = 0; b > c; ++c) this.track_ids[c] = c, this.object_counts[c] = 0;
            var d = a.x1,
                e = a.y1,
                g = a.x2,
                i = a.y2;
            for (c = 0; b > c; ++c) this.curr_xy[c] = Math.random() * (g - d) + d, this.curr_xy[2 * c] = Math.random() * (i - e) + e, this.good_counts[c] = 0, this.object_counts[c] = 0;
            this.move_bb = function(a) {
                var b = a;
                if (1 === this.time_history.length) return b;
                var c, d, e, f, g, i = [],
                    j = [],
                    k = [],
                    l = [],
                    m = !0,
                    n = angular.copy(a),
                    o = a.w,
                    p = a.h;
                n.x1 = n.x1 + o * F.box_padding, n.x2 = n.x2 - o * F.box_padding, n.y1 = n.y1 + p * F.box_padding, n.y2 = n.y2 - p * F.box_padding;
                var q = 0;
                for (c = 0; c < this.num_points; ++c) d = this.prev_xy[2 * c], e = this.prev_xy[2 * c + 1], f = this.curr_xy[2 * c], g = this.curr_xy[2 * c + 1], b && (m = n.inside(d, e), m && q++), !m || 0 === this.point_status[c] || this.good_counts[c] < 2 || (i.push(d), j.push(e), k.push(f), l.push(g));
                if (i.length < 4) return new Detection(b.name, -100, b.x1, b.y1, b.x2, b.y2, b.time, b.ilearn_class);
                var r = h(i, j, k, l, b);
                b = r.det;
                var s = r.error;
                s > 10 && (b.score = -100);
                var t = -.01;
                return 1 > s && (t = 0), i.length < 3 && (console.log("WARNING: only", i.length, "grid points inside detection"), b.score = -100), new Detection(b.name, b.score + t, b.x1, b.y1, b.x2, b.y2, b.time, b.ilearn_class)
            }, this.propagate_det = function(a, b) {
                for (var c = this.time_history.map(function(a) {
                        return Math.abs(a - b)
                    }), d = 0; d < c.length; ++d) this.time_history[d] > b && (c[d] = 1e11);
                var e = Math.min.apply({}, c),
                    f = c.indexOf(e);
                if (f === this.point_history.length - 1) return a;
                e > 0 && 0 === f && console.log("WARNING: time history is not long enough");
                var g = this.point_history[f],
                    i = this.curr_xy,
                    j = this.id_history[f],
                    k = this.track_ids,
                    l = [],
                    m = [],
                    n = [],
                    o = [],
                    p = angular.copy(a),
                    q = a.w,
                    r = a.h;
                p.x1 = p.x1 + q * F.box_padding, p.x2 = p.x2 - q * F.box_padding, p.y1 = p.y1 + r * F.box_padding, p.y2 = p.y2 - r * F.box_padding;
                for (var s = 0, t = 0; t < this.num_points; ++t) {
                    var u = g[2 * t],
                        v = g[2 * t + 1],
                        w = i[2 * t],
                        x = i[2 * t + 1];
                    p.inside(u, v) && s++, p.inside(u, v) && j[t] === k[t] && (l.push(u), m.push(v), n.push(w), o.push(x))
                }
                var y = l.length / s;
                if (l.length < 4) return new Detection(a.name, -100, a.x1, a.y1, a.x2, a.y2, a.time, a.ilearn_class);
                var z = h(l, m, n, o, a);
                a = z.det;
                var A = z.error;
                A > 10 && .7 > y && (a.score = -100);
                for (var B = new Detection(a.name, a.score, a.x1, a.y1, a.x2, a.y2, a.time), C = 0; C < this.num_points; ++C) B.inside(this.curr_xy[2 * C], this.curr_xy[2 * C + 1]) ? this.object_counts[C]++ : this.object_counts[C] = Math.max(this.object_counts[C] - 20, 0);
                return B.line_width = a.line_width, B
            }, this.pre_track = function() {
                var a = this.prev_xy;
                this.prev_xy = this.curr_xy, this.curr_xy = a
            }, this.add_to_history = function(a) {
                this.time_history.push(a), this.point_history.push(new Float32Array(this.curr_xy)), this.id_history.push(angular.copy(this.track_ids)), this.time_history.length > this.max_history_length && (this.time_history = this.time_history.splice(1, this.time_history.length - 1), this.point_history = this.point_history.splice(1, this.point_history.length - 1), this.id_history = this.id_history.splice(1, this.id_history.length - 1))
            }, this.draw_grid = function(a, b) {
                var c, d, e = 2;
                for (c = 0; c < this.num_points; ++c)
                    if (b.show_velocity && this.time_history.length > 1 && 1 === this.point_status[c] && this.good_counts[c] > 2) {
                        var g = this.curr_xy[2 * c] - this.prev_xy[2 * c],
                            h = this.curr_xy[2 * c + 1] - this.prev_xy[2 * c + 1],
                            i = Math.sqrt(g * g + h * h);
                        i > 5 && (i = 5), i /= 5, 0 !== i && (a.strokeStyle = "rgb(" + Math.round(255 * (1 - i)) + "," + Math.round(255 * i) + ",0)", a.beginPath(), a.moveTo(this.curr_xy[2 * c], this.curr_xy[2 * c + 1]), a.lineTo(this.curr_xy[2 * c] - g, this.curr_xy[2 * c + 1] - h), a.closePath(), a.stroke())
                    }
                for (c = 0; c < this.num_points; ++c) 0 !== this.point_status[c] && (d = Math.round(Math.min(10, Math.max(0, this.object_counts[c])) / 10 * 255), this.good_counts[c] > 2 && (a.fillStyle = "rgb(0,0," + d + ")", f(a, this.curr_xy[2 * c], this.curr_xy[2 * c + 1], e)))
            }
        }

        function r(c, d, e) {
            if ("CANVAS" !== e.nodeName) throw "Cannot initialize tracker without a valid canvas";
            if (a && "function" == typeof profiler ? (E = new profiler, E.add("grayscale_time"), E.add("image_pyramid_time"), E.add("optical_flow_time"), E.add("fast_corners")) : E = null, E)
                for (var f = 0; f < E.timers.length; ++f) {
                    var g = E.timers[f];
                    F[g[0]] = g[1].get_runtime() + "ms"
                }
            if (b) {
                J = new dat.GUI, J.domElement.parentElement.style.zIndex = 10, J.closed = !0, $(".dg.ac").toggle();
                var h = J.addFolder("Tracker Parameters");
                h.add(F, "win_size", 7, 100).step(1), h.add(F, "max_iterations", 3, 30).step(1), h.add(F, "epsilon", .001, .1).step(.0025), h.add(F, "min_eigen", 0, .01).step(.0025), h.add(F, "num_points", 40, 1e3).step(1), h.add(F, "box_padding", 0, .9).step(.01), h.open();
                var i = J.addFolder("Display Parameters");
                i.add(F, "show_velocity"), i.add(F, "show_boxes"), i.add(F, "require_detections"), J.add(F, "show_grid"), J.add(F, "require_detections"), J.add(F, "enable_grid");
                var j = J.addFolder("Timing");
                if (j.open(), E) {
                    j.add(F, "fps").listen();
                    for (var k = 0; k < E.timers.length; ++k) {
                        var l = E.timers[k];
                        j.add(F, l[0]).listen()
                    }
                }
            } else J = null;
            K = e, L = d, M = c, N = K.getContext("2d"), N.fillStyle = "rgb(0,255,0)", N.strokeStyle = "rgb(255,0,0)", G.allocate(M, L, jsfeat.U8_t | jsfeat.C1_t), H.allocate(M, L, jsfeat.U8_t | jsfeat.C1_t), B = !0
        }

        function s(a, b) {
            if (!a || !b) return !1;
            for (var c = 0; c < a.length; ++c)
                if (a[c] !== b[c]) return !1;
            return !0
        }

        function t(a, b) {
            if (!a || 0 === a.length || "object" != typeof a) return !1;
            if (!F.enable_grid) return console.log("skipping because enable is disabled"), !1;
            if (!B) return !1;
            if (I && s(I.data, a.data)) return !1;
            if (I = a, F.require_detections === !0 && 0 === D.length) return !1;
            E && E.new_frame();
            var c = H;
            H = G, G = c, E && E.start("grayscale_time"), jsfeat.imgproc.grayscale(a.data, G.data[0].data), E && E.stop("grayscale_time"), E && E.start("image_pyramid_time"), G.build(G.data[0], !0), E && E.stop("image_pyramid_time"), E && E.start("optical_flow_time"), C.pre_track(), jsfeat.optical_flow_lk.track(H, G, C.prev_xy, C.curr_xy, C.num_points, 0 | F.win_size, 0 | F.max_iterations, C.point_status, F.epsilon, F.min_eigen);
            for (var d = 0, e = 0; e < C.point_status.length; ++e) d += C.point_status[e];
            F.num_points !== C.num_points && (C = new q(C.global_bb, F.num_points));
            C = w(C, D);
            for (var f = [], g = 0, h = 0; h < D.length; ++h) D[h] = C.move_bb(D[h]), D[h].score > -1 && (f[g++] = D[h]);
            if (D = f, C.add_to_history(b), E && E.stop("optical_flow_time"), E) {
                F.fps = E.log();
                for (var i = 0; i < E.timers.length; ++i) {
                    var j = E.timers[i];
                    F[j[0]] = j[1].get_runtime() + "ms"
                }
            }
            return O += 1, !0
        }

        function u() {
            if (K && (N.clearRect(0, 0, K.width, K.height), F.enable_grid && (0 !== F.show_grid || 0 !== F.show_boxes))) {
                N.save(), N.scale(K.width / M, K.height / L);
                var a;
                if (F.show_grid && C.draw_grid(N, F), F.show_boxes)
                    for (a = 0; a < D.length; ++a) D[a].score > -100 && (D[a].line_width = 3, D[a].fill = "rgba(255,0,0,.8)", D[a].color = "rgba(255,0,0,.8)", D[a].draw(N));
                N.restore()
            }
        }

        function v(a, b) {
            if (a instanceof Detection == !1) throw "Tracker add_bb needs Detection as input";
            for (var c = C.propagate_det(a, b), d = D, f = -1, g = 0, h = new Array(d.length), i = 0; i < d.length; i++) {
                var j = e(c, d[i]);
                h[i] = j, j > g && (g = j, f = i)
            }
            g > .8 ? (D[f].score = c.score, D[f] = c) : g > .1 ? c.score > d[f].score && (D[f] = c) : D.push(c)
        }

        function w(a, b) {
            var c, d, e, f, g, h, i, j, k, l = a,
                m = _.max(a.track_ids) + 1;
            for (c = 0; c < a.num_points; ++c) d = a.prev_xy[2 * c], e = a.prev_xy[2 * c + 1], f = a.curr_xy[2 * c], g = a.curr_xy[2 * c + 1], k = (d - f) * (d - f) + (e - g) * (e - g), f < a.global_bb.x + 10 || g < a.global_bb.y + 10 || f > a.global_bb.x2 - 10 || g > a.global_bb.y2 - 10 || 0 === a.point_status[c] ? (h = Math.random() * (a.global_bb.x2 - a.global_bb.x) + a.global_bb.x, i = Math.random() * (a.global_bb.y2 - a.global_bb.y) + a.global_bb.y, b.length > 0 && (j = Math.floor(Math.random() * b.length), h = Math.random() * (b[j].x2 - b[j].x1) + b[j].x1, i = Math.random() * (b[j].y2 - b[j].y1) + b[j].y1), l.curr_xy[2 * c] = h, l.curr_xy[2 * c + 1] = i, l.point_status[c] = 0, l.good_counts[c] = 0, l.object_counts[c] = 0, l.track_ids[c] = m, m++) : 1 === a.point_status[c] && l.good_counts[c]++;
            a = l;
            for (var n = 0, o = 0; o < a.num_points; ++o) {
                var p = o;
                d = a.curr_xy[2 * p], e = a.curr_xy[2 * p + 1];
                var q = a.good_counts[p];
                for (c = 0; c < a.num_points; ++c) {
                    var r = a.good_counts[c];
                    if (f = a.curr_xy[2 * c], g = a.curr_xy[2 * c + 1], k = (d - f) * (d - f) + (e - g) * (e - g), k = Math.sqrt(k), c !== p && 8 > k) {
                        n++, h = Math.random() * (a.global_bb.x2 - a.global_bb.x) + a.global_bb.x, i = Math.random() * (a.global_bb.y2 - a.global_bb.y) + a.global_bb.y, b.length > 0 && (j = Math.floor(Math.random() * b.length), h = Math.random() * (b[j].x2 - b[j].x1) + b[j].x1, i = Math.random() * (b[j].y2 - b[j].y1) + b[j].y1);
                        var s = -1;
                        s = q > r ? c : p, l.curr_xy[2 * s] = h, l.curr_xy[2 * s + 1] = i, l.point_status[s] = 0, l.good_counts[s] = 0, l.track_ids[s] = m, m++
                    }
                }
            }
            return l
        }

        function x(a) {
            var b = new Detection("", 1, F.win_size, F.win_size, M - F.win_size, L - F.win_size);
            C = new q(b, F.num_points), C.add_to_history(a)
        }

        function y(a) {
            if (a instanceof Detection == !1) throw "Tracker add_bb needs Detection as input";
            D = D.filter(function(b) {
                return b.name !== a.name
            }), 0 === D.length
        }

        function z(a) {
            if (!B) throw "Cannot get bbs from uninitialized tracker";
            for (var b = K.width / M, c = K.height / L, d = 0; d < D.length; ++d)
                if (D[d].name === a) {
                    var e = D[d],
                        f = {
                            x: e.x * b,
                            y: e.y * c,
                            x1: e.x1 * b,
                            y1: e.y1 * c,
                            x2: e.x2 * b,
                            y2: e.y2 * c,
                            trackerWidth: K.width,
                            trackerHeight: K.height
                        };
                    return f
                }
            return null
        }
        var A = !1,
            B = !1,
            C = [],
            D = [],
            E = null,
            F = {};
        F.win_size = 15, F.max_iterations = 3, F.epsilon = .01, F.min_eigen = 0, F.num_points = 200, F.show_velocity = !0, F.box_padding = 0, F.show_grid = c, F.show_boxes = !0, F.require_detections = d, F.enable_grid = !0, F.fps = "";
        var G = new jsfeat.pyramid_t(3),
            H = new jsfeat.pyramid_t(3),
            I = null,
            J = null,
            K = null,
            L = null,
            M = null,
            N = null,
            O = 0;
        return this.set_dims = function(a, b) {
            (a !== this.width || b !== this.height) && (this.width = a, this.height = b, delete this.curr_img_pyr, delete this.prev_img_pyr, this.curr_img_pyr = new jsfeat.pyramid_t(3), this.prev_img_pyr = new jsfeat.pyramid_t(3), this.curr_img_pyr.allocate(this.width, this.height, jsfeat.U8_t | jsfeat.C1_t), this.prev_img_pyr.allocate(this.width, this.height, jsfeat.U8_t | jsfeat.C1_t))
        }, {
            initialize_canvas: r,
            initialize_grid: x,
            tracker_update: t,
            draw_all: u,
            add_bb: v,
            remove_bb: y,
            get_bb: z,
            params: F,
            os: e
        }
    },
    function(a) {
        a.compatibility = function() {
            "use strict";
            var b = a.URL || a.webkitURL,
                c = function(b, c, d) {
                    var e = a.navigator.getUserMedia || a.navigator.mozGetUserMedia || a.navigator.webkitGetUserMedia || a.navigator.msGetUserMedia || function() {
                        console.error("getUserMedia not found")
                    };
                    return e.call(a.navigator, b, c, d)
                };
            return {
                URL: b,
                getUserMedia: c
            }
        }()
    }(window);
var stopwatch = function() {
        "use strict";

        function a() {
            this.start_time = 0, this.stop_time = 0, this.run_time = 0, this.running = !1
        }
        return a.prototype.start = function() {
            this.start_time = (new Date).getTime(), this.running = !0
        }, a.prototype.stop = function() {
            this.stop_time = (new Date).getTime(), this.run_time = this.stop_time - this.start_time, this.running = !1
        }, a.prototype.get_runtime = function() {
            return this.run_time
        }, a.prototype.reset = function() {
            this.run_time = 0
        }, a
    }(),
    ring_buffer = function() {
        "use strict";

        function a(a) {
            this.arr = new Int32Array(a), this.begin = 0, this.end = -1, this.num_el = 0, this.arr_size = a
        }
        return a.prototype.push_back = function(a) {
            this.num_el < this.arr_size ? (this.end++, this.arr[this.end] = a, this.num_el++) : (this.end = (this.end + 1) % this.arr_size, this.begin = (this.begin + 1) % this.arr_size, this.arr[this.end] = a)
        }, a.prototype.get = function(a) {
            return this.arr[(this.begin + a) % this.arr_size]
        }, a.prototype.size = function() {
            return this.num_el
        }, a
    }(),
    profiler = function() {
        "use strict";

        function a() {
            this.fps = 0, this.timers = [], this.frame_timer = new stopwatch
        }
        var b = 0,
            c = new ring_buffer(20);
        return a.prototype.add = function(a) {
            this.timers.push([a, new stopwatch])
        }, a.prototype.new_frame = function() {
            ++b;
            var a = 0,
                d = 0 | this.timers.length;
            for (a = 0; d > a; ++a) {
                var e = this.timers[a][1];
                e.reset()
            }
            if (b >= 1) {
                this.frame_timer.stop(), c.push_back(this.frame_timer.get_runtime());
                var f = c.size(),
                    g = 0;
                for (a = 0; f > a; ++a) g += c.get(a);
                this.fps = f / g * 1e3, this.frame_timer.start()
            }
        }, a.prototype.find_task = function(a) {
            var b = 0 | this.timers.length,
                c = 0;
            for (c = 0; b > c; ++c) {
                var d = this.timers[c];
                if (d[0] === a) return d
            }
            return null
        }, a.prototype.start = function(a) {
            var b = this.find_task(a);
            b[1].start()
        }, a.prototype.stop = function(a) {
            var b = this.find_task(a);
            b[1].stop()
        }, a.prototype.log = function() {
            var a = (0 | this.timers.length, "FPS: " + this.fps.toFixed(2));
            return a
        }, a
    }(),
    _vmx_is_encoded_image;
! function() {
    _vmx_is_encoded_image = function(a) {
        if ("string" != typeof a) return !1;
        var b = "data:image/jpeg;base64";
        return a.substring(0, b.length) === b ? !0 : !1
    }
}(), angular.module("vmx.services").factory("vmxInterceptor", ["vmxglobals", function(a) {
    return {
        request: function(b) {
            return "/" !== b.url[0] || 0 === b.url.indexOf("/static") || b.cache && b.cache.get(b.url) || (b.url = a.g.server + b.url), b
        }
    }
}]), angular.module("vmx.services").config(["$httpProvider", function(a) {
    a.interceptors.push("vmxInterceptor")
}]), angular.module("vmx.services").factory("vmxboxes", ["VmxDetectorProviderX", "vmxglobals", function(a, b) {
    function c(a) {
        var c = g();
        c.sort(function(a, b) {
            return a.score > b.score
        }), a.save(), a.scale(a.canvas.width / b.g.width, a.canvas.height / b.g.height);
        for (var d in c) c[d].draw(a);
        a.restore()
    }
    var d = [],
        e = function(a, b) {
            "object" != typeof d[a] && (d[a] = []), d[a].push(b)
        },
        f = function(a) {
            d[a] = []
        },
        g = function() {
            var a = [];
            for (var b in d) a = a.concat(d[b]);
            return a
        };
    return a.addStopHook(function(a) {
        f(a.connection.id)
    }), a.addResponseHook(function(a, b) {
        f(a.connection.id);
        var c = a.params.get("display_threshold");
        for (var d in b.objects)
            if (b.objects[d].score > c) {
                var g = new Detection(b.objects[d]);
                e(a.connection.id, g)
            }
    }), {
        list: g,
        reset: f,
        add: e,
        draw: c
    }
}]), angular.module("vmx.services").factory("vmxconnections", ["$q", "$http", function(a, b) {
    var c = [],
        d = "/session",
        e = function(c) {
            var e = a.defer(),
                f = {};
            return b["delete"](d + "/" + c, f).success(function(a) {
                e.resolve(a)
            }).error(function() {
                e.reject("Error deleting connection")
            }), e.promise
        },
        f = function(c, e) {
            void 0 === c || angular.isArray(c) || (c = [c]), void 0 === e && (e = !1);
            var f = a.defer();
            return b.post(d, {
                uuids: []
            }).success(function(a) {
                c && c.length > 0 ? i(a.data.id, c, e).then(function(a) {
                    f.resolve(a.data)
                })["catch"](function(a) {
                    console.log("cannot load model", a), f.reject(a)
                }) : f.resolve(a.data)
            }).error(function() {
                f.reject("Error starting connection")
            }), f.promise
        },
        g = function() {
            var e = a.defer();
            return b.get(d).success(function(a) {
                c = a.data, e.resolve(a.data)
            }).error(function() {
                e.reject("error")
            }), e.promise
        },
        h = function() {
            return c
        },
        i = function(c, e, f) {
            var g = a.defer();
            return b.post(d + "/" + c + "/load", {
                uuids: e,
                compiled: f
            }).success(function(a) {
                g.resolve(a)
            }).error(function() {
                g.reject("error")
            }), g.promise
        };
    return {
        create: f,
        list: g,
        load: i,
        close: e,
        list_cached: h
    }
}]), angular.module("vmx.services").factory("vmxcreatemodel", ["$q", "vmxconnections", "vmxmodels", "vmxdetectors", function(a, b, c, d) {
    function e(c, e) {
        var f = a.defer();
        return b.create(c, e).then(function(a) {
            var b = d.addDetector(a);
            f.resolve(b)
        })["catch"](function(a) {
            f.reject(a)
        }), f.promise
    }

    function f(e, f, g) {
        var h = a.defer();
        return b.create().then(function(a) {
            c.create(a.id, g, e, f).then(function() {
                c.save(a.id).then(function(a) {
                    var b = d.addDetector(a);
                    h.resolve(b)
                })["catch"](function(a) {
                    h.reject("cannot save model:", a)
                })
            })["catch"](function(a) {
                h.reject("cannot create model:", a)
            })
        })["catch"](function(a) {
            h.reject("cannot create session:", a)
        }), h.promise
    }
    return {
        create_session_and_create_model: f,
        create_session_and_load_model: e
    }
}]), angular.module("vmx.services").factory("vmxeditmodel", ["$http", "$q", function(a, b) {
    function c(c, d) {
        var e = "/session/" + c + "/edit",
            f = {
                changes: [],
                settings: d
            },
            g = b.defer();
        return a.post(e, f).success(function(a) {
            g.resolve(a.data)
        }).error(function(a) {
            g.reject(a)
        }), g.promise
    }

    function d(c, d, e) {
        var f = "/session/" + c + "/edit",
            g = {
                settings: d,
                changes: e
            },
            h = b.defer();
        return a.put(f, g).success(function(a) {
            h.resolve(a.data)
        }).error(function(a) {
            h.reject(a)
        }), h.promise
    }
    return {
        show_model: c,
        edit_model: d
    }
}]), angular.module("vmx.services").factory("vmxdetectors", ["VmxDetectorProviderX", "vmxglobals", "vmxconnections", function(a, b, c) {
    function d() {
        return i
    }

    function e(b) {
        var c = h(b);
        return void 0 !== c ? void console.log("Not adding detector, it is already attached") : (c = a.getInstance(), c.set_connection(b), i.push(c), c.start(), c)
    }

    function f(a) {
        var b = i.filter(function(b) {
                return b.connection.id === a.id
            }),
            c = b[0];
        if (void 0 !== c) {
            var d = i.indexOf(c);
            c = i.splice(d, 1).pop(), c.stop()
        } else console.warn("Cannot remove Detector, connection not found")
    }

    function g(a) {
        if (0 > a || a >= i.length) throw "Cannot remove detector at index " + a;
        var b = i.splice(a, 1).pop();
        b.stop()
    }

    function h(a) {
        if (void 0 === a || null === a || null === a.id || void 0 === a.id) throw "Cannot findDetector without connection.id";
        var b = i.filter(function(b) {
            return b.connection.id === a.id
        });
        return b[0]
    }
    var i = [];
    return b.g.auto_attach && c.list().then(function(a) {
        for (var b = 0; b < a.length; ++b) e(a[b])
    }), a.addResponseHook(function(a, b) {
        a.connection.model = b.model
    }), {
        running_detectors: d,
        addDetector: e,
        findDetector: h,
        removeDetector: g,
        removeDetectorById: f
    }
}]), angular.module("vmx.services").factory("VmxDetectorProviderX", ["$q", "$http", "$timeout", "$interval", "vmxutils", "VmxParamsProvider", "vmxconfig", function(a, b, c, d, e, f, g) {
    function h(a) {
        j("stop", a)
    }

    function i(a) {
        j("response", a)
    }

    function j(a, b) {
        if ("function" != typeof b) throw "callback must be a function";
        var c = m[a + "Hooks"];
        c.push(b)
    }

    function k() {
        var a = new n;
        return a
    }
    var l = 100,
        m = {
            responseHooks: [],
            stopHooks: []
        };
    i(function(a, b) {
        a.last_response = b
    });
    var n = function() {
        this.connection = null, this.last_response = null, this.params = f.getInstance(), this.last_time = 0, this.paused = !1, this.fakeDate = null
    };
    return n.prototype.set_connection = function(a) {
        this.connection = a, this.syncParams()
    }, n.prototype.start = function() {
        g.getVideoSrc() || console.warn("Detector must have an image stream to 'start'; maybe you want to detect a single frame?"), this.detectLoop()
    }, n.prototype.syncParams = function() {
        var c = this.params,
            d = "/session/" + this.connection.id + "/params",
            e = a.defer();
        return b.get(d).success(function(a) {
            if (null === a || void 0 === a || void 0 === a.data || null === a.data || !angular.isObject(a.data)) return void e.reject("Bad params response");
            for (var b = Object.keys(a.data), d = 0; d < b.length; ++d) c.set(b[d], a.data[b[d]]);
            e.resolve()
        }).error(function() {
            e.reject("error")
        }), e.promise
    }, n.prototype.stop = function() {
        this.paused = !0, this.fireStopHooks()
    }, n.prototype.cropWorthy = function() {
        return void 0 === this.params.crop_mode || this.params.crop_mode === !1 ? !1 : this.params.get("learn_mode") || !this.last_response || this.last_response.objects.length > 0 && this.last_response.objects[0].score < this.params.get("crop_threshold") ? !1 : !0
    }, n.prototype.getImage = function() {
        if (!g.getVideoSrc()) return !1;
        if (!angular.isFunction(g.getVideoSrc().getImage)) return !1;
        var a = g.getVideoSrc().getImage();
        if (void 0 === a || null === a) return !1;
        var b, c = document.createElement("canvas").getContext("2d");
        c.canvas.width = a.canvas.width, c.canvas.height = a.canvas.height, c.drawImage(a.canvas, 0, 0), a = c;
        var d = this.cropWorthy();
        return b = d ? e.extractCroppedImage(a.canvas, e.applyCrop(this.last_response.objects[0].bb, this.params.get("crop_radius"))) : e.extractCroppedImage(a.canvas, null)
    }, n.prototype.detectLoop = function() {
        var a = this;
        c(function() {
            var b = a.getImage();
            a.detect(b).then(function() {
                a.detectLoop()
            })["catch"](function(b) {
                "paused" !== b && a.detectLoop()
            })
        }, 0)
    }, n.prototype.detectLoop2 = function() {
        var a = this,
            b = d(function() {
                a.paused && (console.log("canceling interval"), d.cancel(b));
                var c = a.getImage();
                a.detect(c).then(function() {})["catch"](function() {})
            }, l)
    }, n.prototype.fireResponseHooks = function(a) {
        var b = m.responseHooks;
        for (var c in b) b[c](this, a)
    }, n.prototype.fireStopHooks = function(a) {
        var b = m.stopHooks;
        for (var c in b) b[c](this, a)
    }, n.prototype.detect = function(c) {
        var d = a.defer();
        if (!this.connection || !this.connection.id) return d.reject("nope"), d.promise;
        if (!c || !c.dataURL) return d.reject("No image to send"), d.promise;
        if (this.paused) return this.stop(), d.reject("paused"), d.promise;
        var f, g = {};
        f = null === this.fakeDate ? new Date : this.fakeDate, g.ajax_start_time = f.getTime(), this.last_time = g.ajax_start_time;
        var h = this.params.flatten(),
            i = {
                image: c.dataURL,
                time: f.toISOString()
            },
            j = "/session/" + this.connection.id,
            k = {
                images: [i],
                params: h
            },
            l = this;
        return b.post(j, k).success(function(a) {
            var b = a;
            b.ajax_time = ((new Date).getTime() - g.ajax_start_time) / 1e3, b = e.undoCrop(b, c), l.fireResponseHooks(b), d.resolve(b)
        }).error(function(a) {
            console.warn("Detection error", a), d.reject("error")
        }), d.promise
    }, {
        getInstance: k,
        addStopHook: h,
        addResponseHook: i
    }
}]), angular.module("vmx.services").factory("vmxglobals", ["$location", function(a) {
    function b() {
        var b = a.search().width,
            d = a.search().height,
            e = a.search().auto_attach,
            f = a.search().show_grid,
            g = a.search().show_video,
            h = a.search().url,
            i = a.search().show_raw_boxes,
            j = a.search().mirror_mode,
            k = a.search().enable_grid,
            l = a.search().ipcam_delay,
            m = a.search().show_menu,
            n = a.search().server;
        void 0 === j || "false" !== j ? j = !0 : (j = !1, console.log("Setting mirror_mode=" + j)), void 0 === i || "true" !== i ? i = !1 : (i = !0, console.log("Setting show_raw_boxes=" + i)), void 0 === h ? h = null : console.log("Setting url=" + h), void 0 === g || "false" !== g ? g = !0 : (g = !1, console.log("Setting show_video=" + g)), void 0 === f || "true" !== f ? f = !1 : (f = !0, console.log("Setting show_grid=" + f)), void 0 === k || "false" !== k ? k = !0 : (k = !1, console.log("Setting enable_grid=" + k)), void 0 === e || "true" !== e ? e = !1 : (e = !0, console.log("Setting auto_attach=" + e)), void 0 === b ? b = 320 : (b = parseInt(b), console.log("Setting width=" + b)), void 0 === d ? d = 240 : (d = parseInt(d), console.log("Setting height=" + d)), void 0 === l ? l = 200 : (l = parseInt(l), console.log("Setting ipcam_delay=" + l)), void 0 === m || "false" !== m ? m = !0 : (m = !1, console.log("Setting show_menu=" + m)), void 0 === n ? n = "" : console.log("Setting server=" + n), c.width = b, c.height = d, c.auto_attach = e, c.show_grid = f, c.show_video = g, c.url = h, c.show_raw_boxes = i, c.mirror_mode = j, c.enable_grid = k, c.ipcam_delay = l, c.show_menu = m, c.server = n
    }
    var c = {};
    return c.width = 320, c.height = 240, b(), {
        g: c
    }
}]), angular.module("vmx.services").factory("vmxIpCamProvider", ["$http", "$window", "$interval", "$location", "vmxImageStreamProvider", "vmxglobals", function(a, b, c, d, e, f) {
    function g(a) {
        var b = d.protocol() + "://" + d.host() + ":" + d.port();
        return 0 === a.indexOf(b) || 0 !== a.indexOf(d.protocol()) ? !1 : (console.warn("Adding forwarding for URL request=", a, " origin=", b, "Result=", unescape(h(a))), !0)
    }

    function h(a) {
        var b = "/forward?q=" + escape(a);
        return b
    }
    var i = 200,
        j = function(d, j) {
            if (void 0 === d || !angular.isString(d)) throw "vmxIpCamProvider: Cannot Create ipcam without a URL";
            if (void 0 === j && (j = i), !angular.isNumber(j) || 0 > j) throw "vmxIpCamProvider: Cannot use non-positive delay";
            var k = g(d),
                l = e.getInstance();
            return l.local_canvas = document.createElement("canvas"), l.local_canvas.width = f.g.width, l.local_canvas.height = f.g.height, l.local_ctx = l.local_canvas.getContext("2d"), l.drawable = !0, l.delay = j, l.num_requests = 0, l.num_failures = 0, l.startTime = null, l.endTime = null, l.blobURL = null, l.is_playing = !0, l.original_src = d, l.img = new Image, l.pause = function() {
                this.is_playing = !1, this.promise && (c.cancel(this.promise), delete this.promise)
            }, l.play = function() {
                this.is_playing = !0, this.promise && (c.cancel(this.promise), delete this.promise), this.start()
            }, l.toggle = function() {
                this.is_playing = !this.is_playing, this.is_playing === !0 ? this.play() : this.pause()
            }, l.start = function() {
                if (!this.is_playing || null === this.src) return void(this.is_playing = !1);
                var d = this;
                this.promise = c(function() {
                    return d.is_playing ? (d.startTime = (new Date).getTime(), void a.get(d.src, {
                        responseType: "arraybuffer"
                    }).success(function(a) {
                        d.elapsedTime = ((new Date).getTime() - d.startTime) / 1e3;
                        var c;
                        if (b.Blob && b.URL && b.URL.createObjectURL) {
                            var e = new b.Blob([new Uint8Array(a)], {
                                    type: "image/jpeg"
                                }),
                                f = b.URL;
                            c = f.createObjectURL(e), d.img.src = c, d.blobURL = c;
                            var g = new Image;
                            g.src = c, g.onload = function() {
                                d.set_image(this)
                            }
                        } else c = "blob", d.img.src = c, d.blobURL = c, d.set_image(d.img)
                    }).error(function() {
                        d.num_failures = d.num_failures + 1
                    })["finally"](function() {
                        d.num_requests = d.num_requests + 1
                    })) : (c.cancel(d.promise), void delete d.promise)
                }, d.delay)
            }, l.src = k === !0 ? h(d) : d, l.set_image = function(a) {
                if (a && this.is_playing !== !1) {
                    var b = f.g,
                        c = a.width,
                        d = a.height,
                        e = null;
                    if (b.width / b.height > c / d) {
                        e = this.local_canvas.height / a.height, c *= e, d *= e;
                        var g = (this.local_canvas.width - c) / 2;
                        this.local_ctx.canvas.width = c, this.local_ctx.canvas.height = d, this.local_ctx.drawImage(a, 0 * g, 0, c, d)
                    } else {
                        e = this.local_canvas.width / a.width, c *= e, d *= e;
                        var h = (this.local_canvas.height - d) / 2;
                        this.local_ctx.canvas.width = c, this.local_ctx.canvas.height = d, this.local_ctx.drawImage(a, 0, 0 * h, c, d)
                    }
                    this.local_ctx.restore(), this.last_time = (new Date).getTime(), this.last_image = this.local_ctx
                }
            }, l.start(), l
        };
    return {
        getInstance: j
    }
}]), angular.module("vmx.services").factory("vmxVideoStreamProvider", ["$interval", "vmxImageStreamProvider", "vmxglobals", function(a, b, c) {
    var d = 100,
        e = function(e) {
            if (!e || !e.tagName || "VIDEO" !== e.tagName) throw "Cannot create vmxVideoStream without a video";
            var f = b.getInstance();
            return f.vid = e, f.vid.style.transform = c.g.mirror_mode === !0 ? "scale(-1,1)" : "", f.drawable = !0, f.vid.style.visibility = "hidden", f.local_canvas = document.createElement("canvas"), f.local_canvas.width = c.g.width, f.local_canvas.height = c.g.height, f.local_ctx = f.local_canvas.getContext("2d"), f.pause = function() {
                this.is_playing = !1, this.promise && (a.cancel(this.promise), delete this.promise)
            }, f.play = function() {
                this.is_playing = !0, this.promise && (a.cancel(this.promise), delete this.promise), this.start()
            }, f.start = function() {
                this.is_playing = !0;
                var b = this;
                this.promise = a(function() {
                    b.set_image()
                }, d)
            }, f.set_image = function() {
                if (void 0 !== this.vid.readyState && 4 === this.vid.readyState) {
                    this.local_canvas.width = c.g.width, this.local_canvas.height = c.g.height, c.g.mirror_mode === !0 && (this.local_ctx.save(), this.local_ctx.translate(this.local_canvas.width, 0), this.local_ctx.scale(-1, 1));
                    try {
                        this.local_ctx.drawImage(this.vid, 0, 0, this.local_canvas.width, this.local_canvas.height)
                    } catch (a) {}
                    c.g.mirror_mode === !0 && this.local_ctx.restore(), this.last_time = (new Date).getTime(), this.last_image = this.local_ctx
                }
            }, f.start(), f
        };
    return {
        getInstance: e
    }
}]), angular.module("vmx.services").factory("vmxwebcam", ["$q", "$window", "vmxappcode", function(a, b, c) {
    function d(a, c, d) {
        a.poster = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", a.src = b.compatibility.URL.createObjectURL(d), a.play(), g = {
            permission: !0,
            supported: !0
        }, c.resolve(g)
    }

    function e(a, b, c) {
        c && c.name && 0 === c.name.indexOf("PermissionDeniedError") ? (console.log("Webcam access not allowed"), g.permission = !1, g.supported = !0) : (console.log("Webcam not supported on your platform"), g.supported = !1, g.permission = null), a.src = "", a.style.visibility = "hidden", console.log("about to reject"), b.reject(g)
    }

    function f(c) {
        if (!c || !c.tagName || "VIDEO" !== c.tagName) throw "Cannot setupStream without a video";
        var f = a.defer();
        return b.compatibility.getUserMedia({
            video: !0
        }, function(a) {
            d(c, f, a)
        }, function(a) {
            e(c, f, a)
        }), f.promise
    }
    c.init();
    var g = {
        permission: null,
        supported: null
    };
    return {
        setupStream: f,
        getStatus: function() {
            return g
        }
    }
}]), angular.module("vmx.services").factory("vmxmodels", ["$q", "$http", "$interval", "vmxglobals", function(a, b, c, d) {
    var e = [],
        f = "/model",
        g = function() {
            var c = a.defer();
            return b.get(f).success(function(a) {
                for (var b = 0; b < a.data.length; ++b) a.data[b].url = d.g.server;
                e = angular.copy(a.data), c.resolve(a.data)
            }).error(function() {
                c.reject("error")
            }), c.promise
        };
    return {
        list: g,
        create: function(d, e, g, h) {
            for (var i = a.defer(), j = angular.copy(e), k = 0; k < j.length; ++k) {
                delete j[k].$$hashKey, delete j[k].icon;
                for (var l = 0; l < j[k].objects.length; ++l) j[k].objects[l].name = g
            }
            var m = {
                    images: j,
                    params: h,
                    session_id: d,
                    name: g
                },
                n = d,
                o = "",
                p = c(function() {
                    b.get("/session/" + n + "/log.txt").success(function(a) {
                        a.message !== o && null !== a.message && (console.log(a.message), o = a.message)
                    })
                }, 100);
            return b.post(f, m).success(function(a) {
                i.resolve(a)
            }).error(function(a) {
                console.warn("create model error", a), i.reject("error")
            })["finally"](function() {
                c.cancel(p)
            }), i.promise
        },
        save: function(c, d, e) {
            var h = a.defer();
            void 0 === d && (d = ""), void 0 === e && (e = !1);
            var i = {
                session_id: c,
                name: d,
                new_uuid: e
            };
            return b.put(f, i).success(function(a) {
                g(), h.resolve(a)
            }).error(function() {
                h.reject("error")
            }), h.promise
        },
        list_remote: function(c) {
            var d = a.defer();
            if (void 0 === c || null === c) throw "Cannot list_remote without a URL";
            return b.get(c + "/model").success(function(a) {
                for (var b = a.data, e = 0; e < b.length; ++e) b[e].url = c;
                d.resolve(b)
            }).error(function() {
                d.reject("error")
            }), d.promise
        },
        list_cached: function() {
            return e
        }
    }
}]), angular.module("vmx.services").factory("VmxParamsProvider", function() {
    function a(a) {
        for (var b in a) {
            var c = a[b],
                d = c.current_value;
            ("float" === c.type || "integer" === c.type) && (d = parseFloat(c.current_value)), isNaN(d) && (d = c.value), "integer" === c.type && (d = Math.round(d)), ("float" === c.type || "integer" === c.type) && (d < c.min_value && (d = c.min_value), d > c.max_value && (d = c.max_value)), "bool" === c.type && (1 === d ? d = !0 : 0 === d && (d = !1)), c.value = d, c.current_value = d, a[b] = c
        }
        return a
    }
    var b = function() {
        this.makeDefaults()
    };
    return b.prototype.makeDefaults = function() {
        this.ui_params = [{
            name: "crop_radius",
            alias: "Detection Crop Percentage",
            value: 80,
            current_value: 80,
            min_value: 0,
            max_value: 1e4,
            widget: "slider",
            group: ["det"],
            learning_mode: !1,
            type: "integer"
        }, {
            name: "crop_threshold",
            alias: "Detection Crop Threshold",
            value: 0,
            current_value: 0,
            min_value: -100,
            max_value: 100,
            widget: "slider",
            group: ["det"],
            learning_mode: !1,
            type: "float"
        }, {
            name: "display_threshold",
            alias: "Detection Display Threshold",
            value: 0,
            current_value: 0,
            min_value: -10,
            max_value: 10,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "float"
        }, {
            name: "jpeg_quality",
            alias: "Image JPEG Quality",
            value: 1,
            current_value: 1,
            min_value: .1,
            max_value: 1,
            widget: "slider",
            group: ["hide"],
            learning_mode: !0,
            type: "float"
        }, {
            name: "remove_smooth_below_threshold",
            alias: "Remove smooth box below display threshold",
            value: !0,
            current_value: !0,
            widget: "checkbox",
            group: ["hide"],
            learning_mode: !0,
            type: "bool"
        }, {
            name: "display_top_detection",
            alias: "Display Top Detection",
            value: !1,
            current_value: !1,
            widget: "checkbox",
            group: ["hide"],
            learning_mode: !0,
            type: "bool"
        }], this.detect_params = [{
            name: "max_windows",
            alias: "Detector Quality",
            value: 100,
            current_value: 100,
            min_value: 0,
            max_value: 5e3,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "integer"
        }, {
            name: "learn_mode",
            alias: "Learning Mode",
            value: !1,
            current_value: !1,
            widget: "checkbox",
            group: ["hide"],
            learning_mode: !0,
            type: "bool"
        }, {
            name: "learn_iterations",
            alias: "# of Learning Iterations",
            value: 10,
            current_value: 10,
            min_value: 0,
            max_value: 1e3,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "integer"
        }, {
            name: "learn_threshold",
            alias: "Learning Update Threshold",
            value: 0,
            current_value: 0,
            min_value: -10,
            max_value: 10,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "float"
        }, {
            name: "train_max_positives",
            alias: "Total Max Positives",
            value: 1e3,
            current_value: 1e3,
            min_value: 1,
            max_value: 2e4,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "integer"
        }, {
            name: "train_max_negatives",
            alias: "Total Max Negatives",
            value: 2e3,
            current_value: 2e3,
            min_value: 1,
            max_value: 2e4,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "integer"
        }, {
            name: "detect_max_overlap",
            alias: "Maximum Overlap Threshold",
            value: .1,
            current_value: .1,
            min_value: 0,
            max_value: .7,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "float"
        }, {
            name: "learn_max_positives",
            alias: "# of Learning Positives",
            value: 1,
            current_value: 1,
            min_value: 0,
            max_value: 100,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "integer"
        }, {
            name: "detect_add_flip",
            alias: "Left-Right Image Flip",
            value: !1,
            current_value: !1,
            widget: "checkbox",
            group: ["det"],
            learning_mode: !0,
            type: "bool"
        }, {
            name: "levels_per_octave",
            alias: "# of Pyramid Levels",
            value: 10,
            current_value: 10,
            min_value: 1,
            max_value: 10,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "integer"
        }, {
            name: "max_image_size",
            alias: "Maximum Image Size",
            value: 640,
            current_value: 640,
            min_value: 100,
            max_value: 2e3,
            widget: "slider",
            group: ["det"],
            learning_mode: !0,
            type: "integer"
        }], this.init_params = [{
            name: "initialize_max_cells",
            alias: "Initial Object Max Size",
            value: 10,
            current_value: 10,
            min_value: 2,
            widget: "slider",
            group: ["init"],
            max_value: 12,
            learning_mode: !0,
            type: "integer"
        }, {
            name: "cell_size",
            alias: "Cell Size (pixels)",
            value: 4,
            current_value: 4,
            min_value: 2,
            widget: "slider",
            group: ["init", "det"],
            max_value: 16,
            learning_mode: !0,
            type: "integer"
        }, {
            name: "initialize_add_flip",
            alias: "Initialize with Left-Right Flips",
            value: !1,
            current_value: !1,
            widget: "checkbox",
            group: ["init"],
            learning_mode: !0,
            type: "bool"
        }], this.named_params = {}, this.named_ui_params = {}, this.named_detect_params = {}, this.named_init_params = {}, this.generate_named_parameters(), this.crop_mode = !1
    }, b.prototype.get = function(a) {
        return this.named_params[a].value
    }, b.prototype.set = function(a, b) {
        this.named_params[a].current_value = b, this.named_params[a].value = b
    }, b.prototype.list_all_params = function() {
        return this.named_params
    }, b.prototype.generate_named_parameters = function() {
        for (var a = 0; a < this.ui_params.length; a++) this.named_params[this.ui_params[a].name] = this.named_ui_params[this.ui_params[a].name] = this.ui_params[a];
        for (a = 0; a < this.detect_params.length; a++) this.named_params[this.detect_params[a].name] = this.named_detect_params[this.detect_params[a].name] = this.detect_params[a];
        for (a = 0; a < this.init_params.length; a++) this.named_params[this.init_params[a].name] = this.named_init_params[this.init_params[a].name] = this.init_params[a]
    }, b.prototype.update_parameters = function() {
        this.ui_params = a(this.ui_params), this.detect_params = a(this.detect_params), this.init_params = a(this.init_params), this.generate_named_parameters(), this.named_params.learn_mode.value === !0 ? (this.named_params.display_top_detection.value = !0, this.named_params.display_top_detection.current_value = !0) : (this.named_params.display_top_detection.value = !1, this.named_params.display_top_detection.current_value = !1)
    }, b.prototype.flatten = function() {
        var a = {};
        for (var b in this.named_params) {
            var c = this.named_params[b].value;
            a[b] = c
        }
        return a
    }, {
        getInstance: function() {
            var a = new b;
            return a
        }
    }
}), angular.module("vmx.services").factory("vmxselector", ["$rootScope", "vmxglobals", "vmxutils", "vmxconfig", function(a, b, c, d) {
    function e(a) {
        u = a, a && a.style && (w = u.style.zIndex, a.children && (v = a.children[1]))
    }

    function f() {
        return null === u ? void console.log("Cannot disable selection mode without calling set_selection_div first") : (r = !1, $("canvas").css("cursor", "default"), u.style.zIndex = w, void a.$apply())
    }

    function g() {
        return null === u ? void console.log("Cannot enable selection mode without calling set_selection_div first") : (r = !0, $("canvas").css("cursor", "crosshair"), void(u.style.zIndex = 1e3))
    }

    function h() {
        r === !0 ? f() : g()
    }

    function i(a) {
        return null == s ? (a.lineWidth = 5, a.strokeStyle = t, a.beginPath(), a.moveTo(0, p), a.lineTo(a.canvas.width, p), a.closePath(), a.stroke(), a.beginPath(), a.moveTo(o, 0), a.lineTo(o, a.canvas.height), a.closePath(), void a.stroke()) : (a.fillStyle = "rgba(60,181,33,0.4)", a.fillRect(s.x, s.y, o - s.x, p - s.y), a.lineWidth = 10, a.strokeStyle = t, void a.strokeRect(s.x, s.y, o - s.x, p - s.y))
    }

    function j(a) {
        if (l()) {
            var e = a.clientX,
                g = a.clientY;
            if (g -= v.getBoundingClientRect().top, null === s) s = {
                x: e,
                y: g
            };
            else {
                var h = d.getVideoSrc().getImage().canvas,
                    i = d.getVideoSrc().getTime(),
                    j = c.extractCroppedImage(h),
                    k = j.dataURL,
                    n = {};
                n.image = k, n.time = new Date(i).toISOString();
                var o = b.g.width / v.width,
                    p = b.g.height / v.height,
                    q = [],
                    r = {};
                r.name = "_selection", r.bb = new Array(s.x * o, s.y * p, e * o, g * p), r.score = null, r.extra = null;
                var t;
                r.bb[0] > r.bb[2] && (t = r.bb[0], r.bb[0] = r.bb[2], r.bb[2] = t), r.bb[1] > r.bb[3] && (t = r.bb[1], r.bb[1] = r.bb[3], r.bb[3] = t), r.icon = c.extractCroppedImage(h, r.bb).dataURL, q.push(r), n.objects = q, m(n), s = null, f()
            }
        }
    }

    function k(a) {
        l() && (o = a.clientX, p = a.clientY, p -= v.getBoundingClientRect().top)
    }

    function l() {
        return r
    }

    function m(a) {
        q.push(a)
    }

    function n() {
        return q
    }
    var o, p, q = [],
        r = !1,
        s = null,
        t = "rgb(205, 2, 0)",
        u = null,
        v = null,
        w = null;
    return {
        add: m,
        get_selections: n,
        set_selection_div: e,
        disable_selection_mode: f,
        enable_selection_mode: g,
        toggle_selection_mode: h,
        get_selection_mode: l,
        savePosition: k,
        getPosition: j,
        drawSelection: i
    }
}]), angular.module("vmx.services").factory("vmxtracker", ["VmxDetectorProviderX", "vmxglobals", function(a, b) {
    function c() {
        var a = b.g.show_grid,
            c = !0,
            e = new GridTracker(!0, !0, a, !c);
        return e.params.enable_grid = b.g.enable_grid, d = e, e
    }
    var d;
    return a.addResponseHook(function(a, b) {
        if (b && b.objects && 0 !== b.objects.length)
            for (var c = 0; c < b.objects.length; ++c) {
                var d = b.objects[c];
                d.score > a.params.get("display_threshold") ? a.tracker && !a.paused && a.tracker.add_bb(new Detection(d), a.last_time) : a.params.get("remove_smooth_below_threshold") && a.tracker && a.tracker.remove_bb(new Detection(a.last_response.objects[0]))
            }
    }), a.addStopHook(function(a) {
        a.last_response && a.last_response.objects.length > 0 && a.tracker && a.tracker.remove_bb(new Detection(a.last_response.objects[0]))
    }), {
        getInstance: c,
        global: function() {
            return d
        }
    }
}]), angular.module("vmx.services").factory("vmxutils", function() {
    var undoCrop = function(response, cropped_image) {
            if (void 0 === response || void 0 === response.objects) throw "Cannot undoCrop, bad input response";
            if (void 0 === cropped_image || void 0 === cropped_image.full_image || void 0 === cropped_image.crop_bb) throw "Cannot undoCrop, bad input cropped_image";
            if (4 !== cropped_image.crop_bb.length) throw "Cannot undoCrop, bad crop_bb";
            for (var i = 0; i < response.objects.length; i++)
                if (response.objects[i].bb) {
                    response.objects[i].bb[0] = response.objects[i].bb[0] + cropped_image.crop_bb[0], response.objects[i].bb[1] = response.objects[i].bb[1] + cropped_image.crop_bb[1], response.objects[i].bb[2] = response.objects[i].bb[2] + cropped_image.crop_bb[0], response.objects[i].bb[3] = response.objects[i].bb[3] + cropped_image.crop_bb[1];
                    for (var q = 0; 4 > q; ++q) response.objects[i].bb[q] = eval(response.objects[i].bb[q].toFixed(2));
                    if (0 === i) {
                        var e = extractCroppedImage(cropped_image.full_image, response.objects[i].bb);
                        response.objects[i].image = e.dataURL
                    }
                }
            return response
        },
        applyCrop = function(a, b) {
            var c = a[2] - a[0],
                d = a[3] - a[1],
                e = new Array(4);
            return e[0] = a[0] - b * c / 100, e[1] = a[1] - b * d / 100, e[2] = a[2] + b * c / 100, e[3] = a[3] + b * d / 100, e
        },
        extractCroppedImage = function(a, b) {
            if (void 0 === a || "CANVAS" !== a.tagName) throw console.warn("ic warn", a), "extractCroppedImage needs a canvas as input";
            var c = a.width,
                d = a.height,
                e = .9,
                f = !1;
            (void 0 === b || null == b) && (f = !0, b = [0, 0, c, d]), b[0] = Math.max(0, b[0]), b[1] = Math.max(0, b[1]), b[2] = Math.min(b[2], c), b[3] = Math.min(b[3], d);
            var g;
            if (f) g = a.toDataURL("image/jpeg", e);
            else {
                var h = document.createElement("canvas");
                h.width = Math.round(b[2] - b[0]), h.height = Math.round(b[3] - b[1]);
                var i = a.getContext("2d").getImageData(b[0], b[1], h.width, h.height);
                h.getContext("2d").putImageData(i, 0, 0), g = h.toDataURL("image/jpeg", e)
            }
            var j = {};
            return j.dataURL = g, j.crop_bb = b, j.full_image = a, j
        };
    return {
        applyCrop: applyCrop,
        extractCroppedImage: extractCroppedImage,
        undoCrop: undoCrop
    }
}), angular.module("vmx.services").provider("vmxconfig", function() {
    var a = null;
    this.$get = function() {
        return {
            getVideoSrc: function() {
                return a
            },
            setVideoSrc: function(b) {
                a = b
            },
            pause: function() {
                a && a.pause()
            },
            play: function() {
                a && a.play()
            },
            toggle: function() {
                a && a.toggle()
            }
        }
    }
}), angular.module("vmx.services").factory("vmxImageStreamProvider", function() {
    var a = function() {
            return new b
        },
        b = function() {
            this.last_image = null, this.last_time = null, this.is_playing = !1, this.drawable = !0
        };
    return b.prototype.getImage = function() {
        return this.last_image
    }, b.prototype.getTime = function() {
        return this.last_time
    }, b.prototype.isPlaying = function() {
        return this.is_playing
    }, b.prototype.play = function() {
        this.is_playing = !0
    }, b.prototype.pause = function() {
        this.is_playing = !1
    }, b.prototype.toggle = function() {
        this.is_playing === !0 ? this.pause() : this.play()
    }, {
        getInstance: a
    }
}), angular.module("vmx.services").factory("vmxCheckLicense", ["$http", "$q", "VMX_USER", function(a, b, c) {
    var d, e, f, g, h = "https://beta.vision.ai/",
        i = "/static/enter_license/dist/index.html",
        j = function() {
            var h = b.defer();
            return a.get("/check").success(function(a) {
                d = a.licensed ? !0 : !1, e = !1, c.user = a.uuid, g = a.uuid, h.resolve(d)
            }).error(function(a) {
                d = !1, e = !0, f = a && a.error ? a.error : "No response from server", h.reject(f)
            }), h.promise
        },
        k = function() {
            return void 0 !== d ? d : !1
        },
        l = function() {
            return void 0 !== e ? e : !1
        },
        m = function() {
            return f
        };
    return {
        runCheck: j,
        isLicensed: k,
        isError: l,
        errorMessage: m,
        buyLink: function() {
            return h
        },
        enterLink: function() {
            return i
        }
    }
}]), angular.module("vmx.services").factory("vmxappcode", ["$window", "$injector", "vmxtracker", "vmxglobals", "VmxDetectorProviderX", function(a, b, c, d, e) {
    function f() {
        g || (a.$vmx = {}, a.$vmx.models = b.get("vmxmodels"), a.$vmx.connections = b.get("vmxconnections"), a.$vmx.detectors = b.get("vmxdetectors"), a.$vmx.detectorFactory = b.get("VmxDetectorProviderX"), a.$vmx.config = b.get("vmxconfig"), a.$vmx.imageStreamProvider = b.get("vmxImageStreamProvider"), a.$vmx.ipCamProvider = b.get("vmxIpCamProvider"), a.$vmx.globals = b.get("vmxglobals").g, a.$vmx.tracker = b.get("vmxtracker"), a.$vmx.defaultDetector = a.$vmx.detectorFactory.getInstance(), a.$vmx.api = a.vmxApi, e.addResponseHook(function(b, c) {
            b = b, a.vmxApi.processServerResponse({
                detections: c.objects
            })
        }), a.vmxApi.fn.getSmooth = function() {
            return c.global().get_bb(this.selector)
        }, a.vmxApi.getDimensions = function() {
            return {
                width: d.g.width,
                height: d.g.height
            }
        }, g = !0, angular.isFunction(a.$vmxinit) && a.$vmxinit())
    }
    var g = !1;
    return {
        init: f
    }
}]), angular.module("vmx").directive("vmxCheck", ["vmxCheckLicense", function(a) {
    return {
        restrict: "E",
        controller: ["$modal", function(b) {
            function c() {
                a.runCheck().then(function() {
                    a.isLicensed() || d()
                })["catch"](function() {
                    e()
                })
            }
            var d = function() {
                    var a = b.open({
                        backdrop: "static",
                        templateUrl: "/static/partial/vmxCheckLicenseModal.html",
                        windowClass: ["vmx-check-license-modal"],
                        controller: ["$scope", "$modalInstance", "vmxCheckLicense", function(a, b, c) {
                            a.buyLink = c.buyLink(), a.enterLink = c.enterLink(), a.cancel = function() {
                                b.close()
                            }, a.check = function() {
                                a.spin = !0, c.runCheck().then(function(c) {
                                    a.spin = !1, c && b.close()
                                }), delete window.runVmxLicenseCheck
                            }, window.runVmxLicenseCheck = a.check
                        }]
                    });
                    a.result.then(function() {})
                },
                e = function() {
                    var a = b.open({
                        templateUrl: "/static/partial/vmxCheckLicenseProblemModal.html",
                        windowClass: ["vmx-check-license-modal"],
                        controller: ["$scope", "$modalInstance", "vmxCheckLicense", function(a, b, c) {
                            a.errorMessage = c.errorMessage(), a.cancel = function() {
                                b.close()
                            }
                        }]
                    });
                    a.result.then(function() {})
                };
            c()
        }]
    }
}]), angular.module("vmx").directive("vmxListModelsPanel", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxListModelsPanel.html",
        link: function(a, b, c) {
            a.download = void 0 !== c.download ? !0 : !1, a.selectable = void 0 !== c.selectable ? !0 : !1
        },
        controller: ["$scope", "$q", "$window", "$location", "vmxmodels", "vmxglobals", "REMOTE_URL", function(a, b, c, d, e, f, g) {
            function h(b) {
                return 0 === a.models.filter(function(a) {
                    var c = -1 !== b.uuid.indexOf(a.uuid) && b.num_pos === a.num_pos && b.num_neg === a.num_neg;
                    return c
                }).length
            }
            a.sortByName = "-end_time", a.local_url = f.g.server, 0 === a.local_url.length && (a.local_url = d.protocol() + "://" + d.host() + ":" + d.port()), a.remote_url = g, a.selections = [], a.remotes = [], a.remove_remote = function(b) {
                a.remotes = a.remotes.filter(function(a) {
                    return a.url !== b
                })
            }, a.models = [], e.list().then(function(b) {
                a.models = b, 0 === a.models.length && a.update_remote()
            }), a.update_remote = function() {
                var c = b.defer();
                return a.remotes.filter(function(b) {
                    return b.url === a.remote_url
                }).length > 0 ? (console.log("URL already in remotes list"), c.reject("URL already in remotes list"), c.promise) : (e.list_remote(a.remote_url).then(function(b) {
                    b.length > 0 && (b = b.filter(function(a) {
                        return h(a)
                    }), a.remotes.unshift({
                        url: a.remote_url,
                        data: b
                    })), c.resolve(b)
                })["catch"](function() {
                    c.reject("Cannot list remote")
                }), c.promise)
            }, a.add_selection = function(b) {
                if (a.selectable && a.download !== !0) {
                    var c = a.selections.filter(function(a) {
                        return a.uuid === b.uuid
                    });
                    0 === c.length ? (a.selections.push(b), b.selected = !0) : (a.selections = a.selections.filter(function(a) {
                        return a.uuid !== b.uuid
                    }), b.selected = !1)
                }
            }
        }]
    }
}), angular.module("vmx").directive("vmxListModelsButton", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxListModelsButton.html",
        controller: ["$scope", "$modal", "vmxconnections", "vmxcreatemodel", "vmxconfig", function(a, b, c, d, e) {
            var f = function(a) {
                var c = b.open({
                    templateUrl: "/static/partial/vmxListModelsModal.html",
                    windowClass: ["vmx-wide-modal"],
                    controller: ["$scope", "$modalInstance", function(a, b) {
                        e.pause(), a.choose = function(a, c) {
                            var d = a.filter(function(a) {
                                return -1 === a.num_neg
                            }).length > 0;
                            d && (c = !0);
                            var e = "model.data";
                            c === !0 && (e = "compiled.data");
                            var f = a.map(function(a) {
                                return a.url ? a.url + "/models/" + a.uuid + "/" + e : a.uuid
                            });
                            b.close({
                                model_uuids: f,
                                compiled: c
                            })
                        }, a.cancel = function() {
                            b.dismiss("cancel")
                        }
                    }]
                });
                c.result.then(function(b) {
                    b && a(b)
                })["catch"](function() {})["finally"](function() {
                    e.play()
                })
            };
            a.choose_model = function() {
                return f(function(b) {
                    var e = b.model_uuids,
                        f = b.compiled;
                    $("#vmx-spinner").css("visibility", "visible"), d.create_session_and_load_model(e, f).then(function(b) {
                        b.tracker = a.tracker, c.list().then(function(b) {
                            a.all_connections = b
                        })
                    })["finally"](function() {
                        $("#vmx-spinner").css("visibility", "hidden")
                    })
                })
            }
        }]
    }
}), angular.module("vmx").directive("vmxEditModelButton", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxEditModelButton.html",
        scope: {
            detector: "="
        },
        controller: ["$scope", "$modal", "vmxconfig", function(a, b, c) {
            var d = a.detector;
            a.displayModelEditorModal = function() {
                c.pause();
                var a = b.open({
                    templateUrl: "/static/partial/vmxEditModelModal.html",
                    windowClass: "vmx-wide-modal",
                    controller: ["$scope", "$modalInstance", function(a, b) {
                        a.detector = d, a.ok = function(a) {
                            b.close(a)
                        }, a.cancel = function() {
                            b.dismiss("cancel")
                        }
                    }]
                });
                a.result["finally"](function() {
                    c.play()
                })
            }
        }]
    }
}), angular.module("vmx").directive("vmxEditModelPanel", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxEditModelPanel.html",
        scope: {
            detector: "=",
            cancelfunction: "="
        },
        controller: ["$scope", "$q", "vmxeditmodel", function(a, b, c) {
            function d() {
                var b = [];
                if (void 0 !== a.container.objects)
                    for (var c = 0; c < a.container.objects.length; ++c)
                        if (a.container.objects[c].class_label !== a.objects_cache[c].class_label) {
                            var d = angular.copy(a.container.objects[c]);
                            delete d.image, b.push(d)
                        }
                return b
            }

            function e() {
                return void 0 === a.detector ? (console.warn("Cannot create EditModelPanel without detector"), void(angular.isFunction(a.cancelfunction) && a.cancelfunction())) : void c.show_model(a.detector.id, a.settings).then(function(b) {
                    a.container.objects = b, a.objects_cache = angular.copy(b)
                })["catch"](function(b) {
                    a.container.objects = [], a.objects_cache = [], console.warn("Error with Model Editor Response", b), angular.isFunction(a.cancelfunction) && a.cancelfunction()
                })
            }
            a.container = {}, a.container.objects = [], a.settings = {}, a.settings.max_positives = 20, a.settings.max_negatives = 20, a.settings.positives_order = 1, a.settings.negatives_order = -1, a.settings.learn_iterations = 10, a.pos = {
                highest: 1e3,
                lowest: -1e3
            }, a.neg = {
                highest: 1e3,
                lowest: -1e3
            }, a.update_model = function() {
                var e = d(),
                    f = b.defer();
                return a.working = !0, c.edit_model(a.detector.id, a.settings, e).then(function(b) {
                    a.container.objects = b, a.objects_cache = angular.copy(b), f.resolve(b)
                })["catch"](function(a) {
                    console.log("error with edit_model", a), f.reject("error with edit_model")
                })["finally"](function() {
                    a.working = !1
                }), f.promise
            }, e()
        }]
    }
}), angular.module("vmx").directive("vmxSaveModelPanel", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxSaveModelPanel.html",
        scope: {
            detector: "=",
            cancelfunction: "="
        },
        controller: ["$scope", "$timeout", "vmxmodels", "vmxdetectors", function(a, b, c, d) {
            a.waiting = !1, a.progress_dynamic = 0, a.progress_max = 200, a.progress_type = "success", a.input = {}, a.input.new_uuid = !1, a.save = function(b, e) {
                if (void 0 === a.detector || void 0 === a.detector.id) throw "Cannot save without a valid session";
                a.waiting = !0, a.update_time(), c.save(a.detector.id, b, e).then(function(c) {
                    a.progress_dynamic = a.progress_max;
                    var e = d.findDetector(c);
                    e.connection.model.name = b
                })["catch"](function(a) {
                    console.log("error saving model", a)
                })["finally"](function() {
                    a.waiting = !1, a.progress_dynamic = 0, a.cancelfunction()
                })
            }, a.update_time = function() {
                a.progress_dynamic < a.progress_max && (a.progress_dynamic += 3, b(a.update_time, 100))
            }
        }]
    }
}), angular.module("vmx").directive("vmxSaveModelButton", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxSaveModelButton.html",
        scope: {
            detector: "="
        },
        controller: ["$scope", "$modal", "vmxconfig", function(a, b, c) {
            a.open_save_modal = function() {
                var d = a.detector;
                if (void 0 === d || null === d) throw "cannot save empty detector";
                c.pause();
                var e = b.open({
                    templateUrl: "/static/partial/vmxSaveModelModal.html",
                    controller: ["$scope", "$modalInstance", function(a, b) {
                        a.detector = d, a.cancel = function() {
                            b.dismiss("cancel")
                        }
                    }]
                });
                e.result.then(function() {})["catch"](function() {})["finally"](function() {
                    c.play()
                })
            }
        }]
    }
}), angular.module("vmx").directive("vmxListSessions", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxListSessions.html",
        link: function(a) {
            a.update()
        },
        controller: ["$scope", "$q", "vmxconnections", function(a, b, c) {
            a.close = function(d) {
                var e = b.defer();
                return c.close(d).then(function() {
                    a.update()["finally"](function(a) {
                        e.resolve(a)
                    })
                })["catch"](function(a) {
                    e.reject("error " + a)
                }), e.promise
            }, a.update = function() {
                var d = b.defer();
                return c.list().then(function(b) {
                    a.connections = b, 0 === b.length && (a.nothing = "No open sessions")
                })["finally"](function(a) {
                    d.resolve(a)
                }), d.promise
            }
        }]
    }
}), angular.module("vmx").directive("vmxListVideosButton", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxListVideosButton.html",
        controller: ["$scope", "$modal", "vmxIpCamProvider", "vmxconfig", "vmxglobals", function(a, b, c, d, e) {
            a.external_source_modal = function() {
                d.pause();
                var a = b.open({
                    templateUrl: "/static/partial/vmxListVideosModal.html",
                    windowClass: ["vmx-wide-modal"],
                    controller: ["$scope", "$modalInstance", function(a, b) {
                        a.load_imagestream = function(a) {
                            b.close(a)
                        }, a.load_dataurl = function(a) {
                            var c = a,
                                d = new Image;
                            d.src = c, d.onload = function() {
                                b.close(c)
                            }
                        }, a.cancel = function() {
                            b.dismiss("cancel")
                        }
                    }]
                });
                a.result.then(function(a) {
                    if (a) {
                        var b = c.getInstance(a, e.g.ipcam_delay);
                        d.setVideoSrc(b), $("#main-video-container").css("background", "white"), $("#video-vmx-stooge-container").css("visibility", "hidden")
                    }
                })["finally"](function() {
                    d.play()
                })
            }
        }]
    }
}), angular.module("vmx").directive("vmxListVideosPanel", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxListVideosPanel.html",
        controller: ["$scope", "$window", "$location", "vmxmodels", "vmxwebcam", function(a, b, c, d, e) {
            a.userAgent = b.navigator.userAgent, a.webcam_status = e.getStatus(), d.list().then(function(b) {
                a.models = b
            }), a.base_url = c.protocol() + "://" + c.host() + ":" + c.port(), a.input = "", a.show_models = !1, a.getDataURL = function(b) {
                var c = new FileReader;
                c.readAsDataURL(b.file), c.onload = function(b) {
                    a.load_dataurl(b.target.result)
                }
            }
        }]
    }
}), angular.module("vmx").directive("vmxAvailableDetectors", ["vmxdetectors", function(a) {
    return {
        restrict: "E",
        require: "^vmxOverlayMenu",
        templateUrl: "/static/partial/vmxAvailableDetectors.html",
        controller: ["$scope", "vmxconfig", function(b, c) {
            b.toggleFullView = function(b) {
                var c = a.findDetector(b);
                c.is_visible = !c.is_visible
            }, b.isAttached = function(b) {
                return void 0 !== a.findDetector(b)
            }, b.toggleDetector = function(d) {
                if (b.isAttached(d)) a.removeDetectorById(d);
                else if (null !== c.getVideoSrc() && null !== c.getVideoSrc().getImage()) {
                    var e = a.addDetector(d);
                    e.tracker = b.tracker
                } else console.warn("Not adding detector without videoSrc")
            }
        }]
    }
}]), angular.module("vmx").directive("vmxCreateModel", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxCreateModel.html",
        link: function(a, b) {
            b.parent().draggable ? b.parent().draggable({
                handle: ".dragbar",
                stack: ".dbar"
            }) : console.log("not making parent draggable"), a.jshint_happy_hack_ = !0
        },
        controller: ["$scope", "vmxselector", "vmxconfig", "vmxmodels", "vmxconnections", "VmxParamsProvider", "vmxcreatemodel", function(a, b, c, d, e, f, g) {
            d.list(), a.show_params = !1, a.paramsObj = f.getInstance(), a.createModelVisibility = !1, a.model_name = "", a.show_selections = !0, a.selections = b.get_selections(), a.error_message = 0 === a.selections.length ? "Must have at least one example" : "", a.is_loaded = function() {
                return a.pretend === !0 || null !== c.getVideoSrc()
            }, a.get_selection_mode = function() {
                return b.get_selection_mode()
            }, a.toggle_selection_mode = function() {
                b.toggle_selection_mode()
            }, a.has_selections = function() {
                return a.selections.length > 0
            }, a.remove_selection = function(b) {
                a.selections.splice(b, 1), a.has_selections() || (a.error_message = "Must have at least one example")
            }, a.is_valid_name = function(b) {
                if (0 === b.length) return a.error_message = "Model name cannot be empty", !1;
                if (b.search(" ") >= 0) return a.error_message = "Model name cannot contain spaces", !1;
                if ("none" === b) return a.error_message = 'Model name cannot be "none"', !1;
                if ("null" === b) return a.error_message = 'Model name cannot be "null"', !1;
                var c = d.list_cached(),
                    e = 0 === c.filter(function(a) {
                        return a.name === b
                    }).length;
                return a.error_message = e ? "" : 'Model name "' + b + '" already used', e
            }, a.create_model = function(b) {
                a.working = !0, a.paramsObj.update_parameters();
                var c = a.paramsObj.flatten();
                if (a.is_valid_name(b)) {
                    var d = angular.copy(a.selections),
                        f = g.create_session_and_create_model(b, c, d).then(function(b) {
                            b.tracker = a.tracker, a.createModelVisibility = !1
                        })["catch"](function() {
                            console.warn("Error Creating Model")
                        })["finally"](function() {
                            e.list().then(function(b) {
                                a.all_connections = b
                            }), a.working = !1
                        });
                    return f
                }
            }
        }]
    }
}), angular.module("vmx").directive("vmxDetectorParam", function() {
    return {
        restrict: "E",
        require: "^vmxDetectorParams",
        templateUrl: "/static/partial/vmxDetectorParam.html",
        link: function(a) {
            a.param.slider_step = "slider" === a.param.widget && "float" === a.param.type ? parseFloat((a.param.max_value - a.param.min_value) / 100).toPrecision(2) : 1
        },
        controller: ["$scope", function(a) {
            a.$on("expandAll", function(b, c) {
                a.paramcontainer.collapse = c
            })
        }]
    }
}), angular.module("vmx").directive("vmxDetectorParams", function() {
    return {
        restrict: "E",
        require: "^vmxRunningDetectors",
        templateUrl: "/static/partial/vmxDetectorParams.html",
        scope: {
            paramsObj: "=params",
            toInclude: "&",
            showbutton: "=showbutton"
        },
        controller: ["$scope", function(a) {
            a.params = a.paramsObj.list_all_params(), a.update_button = void 0 === a.showbutton ? !0 : a.showbutton, a.update_current_parameters = function() {
                a.paramsObj.update_parameters(), a.params = a.paramsObj.list_all_params(), a.$emit("updateButtonPressed")
            }, a.collapse_state = !0, a.expand_all_params = function() {
                a.collapse_state = !a.collapse_state, a.$broadcast("expandAll", a.collapse_state)
            }, a.update_current_parameters()
        }]
    }
}), angular.module("vmx").directive("vmxDetectorThumbnail", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxDetectorThumbnail.html",
        scope: {
            model: "=model",
            showdownloadlinks: "=showdownloadlinks"
        },
        link: function(a) {
            a.model && a.model.image && angular.isString(a.model.image) && a.model.url && 0 !== a.model.image.indexOf("data:image") ? a.image = a.model.url + "/" + a.model.image : a.model && a.model.image && 0 === a.model.image.indexOf("models/") ? a.image = "/" + a.model.image : a.model && a.model.image && (a.image = a.model.image), a.compiled = a.model && a.model.num_neg && -1 === a.model.num_neg ? !0 : !1
        }
    }
}), angular.module("vmx").directive("vmxLearningThumbnail", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxLearningThumbnail.html",
        scope: {
            model: "=",
            params: "=",
            download: "=",
            detector: "=",
            showimage: "="
        },
        link: function(a) {
            a.params && $("flot > div").on("plotclick", function(b, c) {
                var d = c.y / 100 * 2 - 1;
                a.params.named_params.learn_threshold.value = d, a.params.named_params.learn_threshold.current_value = d;
                for (var e = 0; e < a.dataset[0].data.length; ++e) a.dataset[0].data[e] && (a.dataset[0].data[e][1] = c.y)
            })
        },
        controller: ["$scope", "$timeout", function(a, b) {
            if (a.params) {
                a.counter = 0, a.dataset = [{
                    data: [],
                    label: "Learning Threshold",
                    color: "#47a3da",
                    lines: {
                        show: !0
                    }
                }, {
                    data: [],
                    color: "rgb(218,200,71)",
                    lines: {
                        show: !0,
                        fill: !0
                    }
                }], a.detector && a.detector.connection && a.detector.connection.model && void 0 !== a.detector.connection.model.num_neg && -1 === a.detector.connection.model.num_neg && (a.dataset[0].label = "", a.dataset[0].lines.show = !1);
                for (var c = a.params.named_params.learn_threshold.value, d = (c + 1) / 2 * 100, e = 0; 100 > e; ++e) a.dataset[0].data[e] = [e, d], a.dataset[1].data[e] = [e, 0 / 0], e % 5 === 0 && e > 0 && 99 !== e && (a.dataset[0].data[e] = null);
                a.options = {
                    series: {
                        shadowSize: 0
                    },
                    grid: {
                        show: !0,
                        clickable: !0,
                        autoHighlight: !1
                    },
                    legend: {
                        margin: [20, 20],
                        backgroundOpacity: 0,
                        position: "sw"
                    },
                    yaxis: {
                        min: -1,
                        max: 101,
                        ticks: [
                            [0, "-1"],
                            [25, ""],
                            [50, "0"],
                            [75, ""],
                            [100, "+1"]
                        ]
                    },
                    xaxis: {
                        min: 0,
                        max: 100,
                        ticks: [
                            [0, ""],
                            [25, ""],
                            [50, ""],
                            [75, ""],
                            [100, ""]
                        ]
                    }
                }, a.dataset2 = a.dataset, a.update = function() {
                    if (a.detector && void 0 !== a.detector.last_response && null !== a.detector.last_response && a.detector.last_response.objects.length > 0 && null !== a.detector.last_response.objects[0].score) {
                        var c = a.detector.last_response.objects[0].score;
                        c = Math.max(-1, c), c = Math.min(1, c), c = (c + 1) / 2 * 100;
                        var d = [0, c];
                        a.counter++, a.dataset[1].data.push(d), a.dataset[1].data.length > 100 && (a.dataset[1].data = a.dataset[1].data.splice(1));
                        for (var e = 0; e < a.dataset[1].data.length; ++e) null !== a.dataset[1].data[e] && (a.dataset[1].data[e][0] = e);
                        a.dataset2 = a.dataset
                    }
                    b(a.update, 10)
                }, a.update(), a.get_type = function(a) {
                    var b;
                    return b = -.5 > a ? "danger" : .5 > a ? "warning" : "success"
                }
            }
        }]
    }
}), angular.module("vmx").directive("vmxImageCrop", ["$compile", function(a) {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxImageCrop.html",
        scope: {
            "class": "=class",
            score: "=score",
            time: "@time",
            image: "@image"
        },
        link: function(b, c) {
            a(c.contents())(b)
        }
    }
}]), angular.module("vmx").directive("vmxOverlayMenu", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxOverlayMenu.html",
        controller: ["$scope", "vmxglobals", "vmxselector", "vmxconnections", "vmxconfig", function(a, b, c, d, e) {
            a.all_connections = [], d.list().then(function(b) {
                a.all_connections = b
            }), a.showobj = !0, a.showmenu = !0, a.selectionMode = c.get_selection_mode, a.show_menu = function() {
                return b.g.show_menu
            }, a.toggle_video = function() {
                e.toggle()
            }
        }]
    }
}), angular.module("vmx").directive("vmxRunningDetectors", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxRunningDetectors.html",
        controller: ["$scope", "vmxdetectors", function(a, b) {
            a.set_param = function(a, c, d) {
                b.running_detectors()[a].params.set(c, d)
            }, a.get_param = function(a, c) {
                return b.running_detectors()[a].params.get(c)
            }, a.running_detectors = function() {
                return b.running_detectors()
            }
        }]
    }
}), angular.module("vmx").directive("vmxTracker", ["vmxtracker", "vmxconfig", function(a, b) {
    return {
        restrict: "E",
        require: "^vmxVideo",
        templateUrl: "/static/partial/vmxTracker.html",
        link: function(c, d) {
            c.trackerId = c.toId("tracker", c.vname), c.addCanvas(d[0].children[0]), c.tracker_canvas = document.getElementById(c.trackerId), c.tracker = a.getInstance(), c.addPostFunction(function() {
                var a = b.getVideoSrc();
                if (c.tracker.params.enable_grid === !0 && a && a.last_image) {
                    var d = a.last_image,
                        e = a.getTime(),
                        f = d.getImageData(0, 0, d.canvas.width, d.canvas.height);
                    c.tracker.tracker_update(f, e)
                }
            }), c.addPostFunction(c.tracker.draw_all), c.perform_initialization(), c.tracker_mode = c.get_tracker_mode()
        },
        controller: ["$scope", "vmxglobals", "$timeout", function(a, c, d) {
            a.get_tracker_mode = function() {
                return a.tracker.params.enable_grid === !1 && a.tracker.params.show_grid === !1 ? 0 : a.tracker.params.enable_grid === !0 && a.tracker.params.show_grid === !1 ? 1 : a.tracker.params.enable_grid === !0 && a.tracker.params.show_grid === !0 ? 2 : 3
            }, a.toggle_tracker = function() {
                a.tracker_mode++, a.tracker_mode > 3 && (a.tracker_mode = 0), 0 === a.tracker_mode ? (a.tracker.params.enable_grid = !1, a.tracker.params.show_grid = !1, c.g.show_raw_boxes = !0, $(".dg.ac").hide()) : 1 === a.tracker_mode ? (a.tracker.params.enable_grid = !0, a.tracker.params.show_grid = !1, c.g.show_raw_boxes = !1, $(".dg.ac").hide()) : 2 === a.tracker_mode ? (a.tracker.params.enable_grid = !0, a.tracker.params.show_grid = !0, c.g.show_raw_boxes = !1, $(".dg.ac").hide()) : (a.tracker.params.enable_grid = !0, a.tracker.params.show_grid = !0, c.g.show_raw_boxes = !1, $(".dg.ac").show())
            }, a.perform_initialization = function() {
                var e = b.getVideoSrc();
                if (a.initialized !== !0) {
                    if (!e || !e.last_image) return void d(function() {
                        a.perform_initialization()
                    }, 100);
                    a.tracker_canvas = document.getElementById(a.trackerId), a.tracker.initialize_canvas(c.g.width, c.g.height, a.tracker_canvas), a.tracker.initialize_grid(0), a.initialized = !0
                }
            }
        }]
    }
}]), angular.module("vmx").directive("vmxVideo", ["$window", "$interval", "$timeout", "vmxselector", "vmxwebcam", "vmxIpCamProvider", "vmxglobals", "vmxconfig", "vmxVideoStreamProvider", function(a, b, c, d, e, f, g, h, i) {
    var j = 50;
    return {
        restrict: "E",
        transclude: !0,
        templateUrl: "/static/partial/vmxVideo.html",
        link: function(a, b, j) {
            var k = j.vname ? j.vname : "vmx";
            if (a.toId = function(a, b) {
                    return a.trim() + "-vmx-" + b.trim()
                }, a.videoId = a.toId("video", k), a.mainId = a.toId("main", k), void 0 !== j.url ? a.url = j.url : !j.url && g.g.url && (a.url = g.g.url), void 0 !== j.ipcamdelay ? a.ipcam_delay = parseInt(j.ipcamdelay) : !j.ipcamdelay && g.g.ipcam_delay && (a.ipcam_delay = g.g.ipcam_delay), a.selection_div = b[0].children[0], a.vid = b[0].children[0].children[0], a.canvas = b[0].children[0].children[1], a.gCtx = a.canvas.getContext("2d"), a.vname = k, a.element = b, a.main = b[0].children, a.canvasList = [b[0].children[0].children[1]], d.set_selection_div(a.selection_div), a.videoStyle = g.g.show_video === !1 ? {
                    visibility: "hidden"
                } : {
                    visibility: "visible"
                }, a.url) {
                $(a.main).css("background", "white"), console.log("url is", a.url);
                var l = f.getInstance(a.url, a.ipcam_delay);
                h.setVideoSrc(l), a.vid.src = "", a.vid.style.visibility = "hidden", c(function() {
                    a.postfun(), a.start()
                }, 400)
            } else e.setupStream(a.vid).then(function() {
                var b = i.getInstance(a.vid);
                h.setVideoSrc(b), a.white_out_logo(), a.postfun(), a.start()
            })["catch"](function(b) {
                console.warn("Cannot setup webcam, status=", b), a.start(), console.log("scope vid is", a.vid), a.vid.src = "/static/img/w.mp4", a.vid.style.visibility = "visible";
                var c = i.getInstance(a.vid);
                h.setVideoSrc(c), a.white_out_logo(), a.postfun(), a.start()
            })
        },
        controller: ["$scope", "vmxglobals", "vmxboxes", function(c, e, f) {
            function g() {
                i = $(window).width(), k = e.g.height / e.g.width * i;
                for (var a = 0; a < c.canvasList.length; ++a) c.canvasList[a].height = k, c.canvasList[a].width = i;
                $(c.main).css("height", k), $(c.main).css("width", i), $(c.vid).css("height", k), $(c.vid).css("width", i)
            }
            c.postfun = function() {
                angular.isFunction(c.vid.play) && c.vid.play(), g()
            };
            var i, k, l = [];
            c.addPostFunction = function(a) {
                l.push(a)
            }, c.start = function() {
                b(c.draw, j)
            }, c.addCanvas = function(a) {
                c.canvasList.push("string" == typeof a ? document.getElementById(a) : a), c.canvasList[c.canvasList.length - 1].addEventListener("mousedown", d.getPosition, !1), c.canvasList[c.canvasList.length - 1].addEventListener("mousemove", d.savePosition, !1)
            }, angular.element(a).on("resize", function() {
                g()
            }), c.white_out_logo = function() {
                $(c.main).css("background", "white")
            }, c.hide_video = function() {
                $(c.main).css("visibility", "hidden")
            }, c.draw = function() {
                for (var a, b = h.getVideoSrc(), g = 0; g < c.canvasList.length; ++g) a = c.canvasList[g], b && b.img || a.getContext("2d").clearRect(0, 0, a.width, a.height);
                if (c.gCtx.save(), b && b.getImage() && b.drawable) {
                    var i = b.getImage(),
                        j = i.canvas.width,
                        k = i.canvas.height,
                        m = null;
                    if (e.g.width / e.g.height > j / k) {
                        m = c.canvas.height / k, j *= m, k *= m;
                        var n = (c.canvas.width - j) / 2;
                        c.gCtx.drawImage(i.canvas, 0 * n, 0, j, k)
                    } else {
                        m = c.canvas.width / j, j *= m, k *= m;
                        var o = (c.canvas.height - k) / 2;
                        c.gCtx.drawImage(i.canvas, 0, 0 * o, j, k)
                    }
                }
                for (c.gCtx.restore(), d.get_selection_mode() && d.drawSelection(c.gCtx), e.g.show_raw_boxes === !0 && f.draw(c.gCtx), g = 0; g < l.length; ++g) l[g]()
            }
        }]
    }
}]), angular.module("vmx").directive("vmxCopyrightFooter", function() {
    return {
        restrict: "E",
        templateUrl: "/static/partial/vmxCopyrightFooter.html",
        controller: ["$scope", "vmx_version", function(a, b) {
            console.log("Welcome to VMX " + b), a.version = function() {
                var a = b.replace("vmxAppBuilder_", "");
                if (a = a.replace("-dirty", ""), a.length > 12) {
                    var c = a.lastIndexOf("-");
                    a = -1 === c ? a.substr(0, 12) : a.substr(0, c)
                }
                return a
            }
        }]
    }
}), angular.module("vmx.services").filter("classIs", function() {
    return function(a, b) {
        return a.filter(function(a) {
            return a.class_label === b
        })
    }
}), angular.module("vmx.services").filter("includeParams", function() {
    return function(a, b) {
        if (b && b instanceof Array) {
            var c = {};
            for (var d in a) d && (-1 !== b.indexOf(d) || _.intersection(a[d].group, b).length) && (c[d] = a[d]);
            a = c
        }
        return a
    }
}), angular.module("vmx.services").filter("scoreIs", function() {
    return function(a, b, c) {
        var d;
        if ("undefined" == typeof c || "" === c) return a;
        switch (d = function() {
            return !0
        }, b) {
            case "<":
            case "lt":
                d = function(a, b) {
                    return b > a
                };
                break;
            case ">":
            case "gt":
                d = function(a, b) {
                    return a > b
                }
        }
        return a.filter(function(a) {
            return d(a.score, c)
        })
    }
});
