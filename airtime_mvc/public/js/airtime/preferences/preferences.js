function showErrorSections() {
    var selector = $("[id$=-settings]");
    selector.each(function(i) {
        var el = $(this);
        var errors = el.find(".errors");
        if (errors.length > 0) {
            el.show();
            $(window).scrollTop(errors.position().top);
        }
    });
}

function setConfigureMailServerListener() {
    var configMailServer = $("#configureMailServer");
    configMailServer.click(function(event){
        setMailServerInputReadonly();
    });
    
    var msRequiresAuth = $("#msRequiresAuth");
    msRequiresAuth.click(function(event){
        setMsAuthenticationFieldsReadonly($(this));
    });
}

function setEnableSystemEmailsListener() {
    var enableSystemEmails = $("#enableSystemEmail");
    enableSystemEmails.click(function(event){
        setSystemFromEmailReadonly();
    });
}

function setSystemFromEmailReadonly() {
    var enableSystemEmails = $("#enableSystemEmail");
    var systemFromEmail = $("#systemEmail");
    if ($(enableSystemEmails).is(':checked')) {
        systemFromEmail.removeAttr("readonly");	
    } else {
        systemFromEmail.attr("readonly", "readonly");
    }	
}

function setMailServerInputReadonly() {
    var configMailServer = $("#configureMailServer");
    var mailServer = $("#mailServer");
    var port = $("#port");
    var requiresAuthCB = $("#msRequiresAuth");
    
    if (configMailServer.is(':checked')) {
        mailServer.removeAttr("readonly");
        port.removeAttr("readonly");
        requiresAuthCB.parent().show();
    } else {
        mailServer.attr("readonly", "readonly");
        port.attr("readonly", "readonly");
        requiresAuthCB.parent().hide();
    }
    
    setMsAuthenticationFieldsReadonly(requiresAuthCB);
}

function setTuneInSettingsListener() {
    var enableTunein = $("#enable_tunein");
    enableTunein.click(function(event){
        setTuneInSettingsReadonly();
    });
}

function setTuneInSettingsReadonly() {
    var enableTunein = $("#enable_tunein");
    var stationId = $("#tunein_station_id");
    var partnerKey = $("#tunein_partner_key");
    var partnerId = $("#tunein_partner_id");

    if (enableTunein.is(':checked')) {
        stationId.removeAttr("readonly");
        partnerKey.removeAttr("readonly");
        partnerId.removeAttr("readonly");
    } else {
        stationId.attr("readonly", "readonly");
        partnerKey.attr("readonly", "readonly");
        partnerId.attr("readonly", "readonly");
    }
}

function setSoundCloudSettingsListener() {
    var connect = $("#SoundCloudConnect"),
        disconnect = $("#SoundCloudDisconnect");
    connect.click(function(e){
        e.preventDefault();
        window.location.replace(baseUrl + "soundcloud/authorize");
    });

    disconnect.click(function(e){
        e.preventDefault();
        window.location.replace(baseUrl + "soundcloud/deauthorize");
    });
}

/*
 * Enable/disable mail server authentication fields
 */
function setMsAuthenticationFieldsReadonly(ele) {
    var email = $("#email");
    var password = $("#ms_password");
    var configureMailServer = $("#configureMailServer");
    
    if (ele.is(':checked') && configureMailServer.is(':checked')) {
        email.removeAttr("readonly");
        password.removeAttr("readonly");
    } else if (ele.not(':checked') || configureMailServer.not(':checked')) {
        email.attr("readonly", "readonly");
        password.attr("readonly", "readonly");
    }
}

function removeLogo() {
    $.post(baseUrl+'Preference/remove-logo', function(json){});
    location.reload();
}

function deleteAllFiles() {
    var resp = confirm($.i18n._("Are you sure you want to delete all the tracks in your library?"))
    if (resp) {
        $.post(baseUrl+'Preference/delete-all-files', function(json){});
        location.reload();
    }
}

$(document).ready(function() {

    $('.collapsible-header').live('click',function() {
        $(this).next().toggle('fast');
        $(this).toggleClass("closed");
        return false;
    });

    if ($("#tunein-settings").find(".errors").length > 0) {
        $(".collapsible-content#tunein-settings").show();
    }

    /* No longer using AJAX for this form. Zend + our code makes it needlessly hard to deal with. -- Albert
    $('#pref_save').live('click', function() {
        var data = $('#pref_form').serialize();
        var url = baseUrl+'Preference/index';
        
        $.post(url, {format: "json", data: data}, function(json){
            $('#content').empty().append(json.html);
            setTimeout(removeSuccessMsg, 5000);
            showErrorSections();
            setMailServerInputReadonly();
            setConfigureMailServerListener();
            setEnableSystemEmailsListener();
        });
    });*/

    showErrorSections();
    
    setMailServerInputReadonly();
    setSystemFromEmailReadonly();
    setConfigureMailServerListener();
    setEnableSystemEmailsListener();
    setTuneInSettingsReadonly();
    setTuneInSettingsListener();
    setSoundCloudSettingsListener();
});
