"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionAuthUserGet = exports.FusionAuthUserEdition = exports.FusionAuthUserRoleCreation = exports.FusionAuthApplicatonAssign = exports.FusionAuthUserApplicatonGet = exports.FusionAuthUserCreation = exports.FusionAuthUserDeletion = exports.FusionAuthUserCreationWithAppAndRole = exports.FusionAutRoleCRUDAlongWithApp = exports.FusionAuthApplicationDeletion = exports.FusionAuthApplicationCreationWithRole = exports.FusionAuthTenantDeletion = exports.FusionAuthTenantCreation = void 0;
const FusionAuthTenantCreation = async (tenantId, tenantName) => {
    const tenantResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/tenant/${tenantId}`, {
        method: 'POST',
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tenant: {
                id: tenantId,
                name: tenantName,
            },
        }),
    });
    if (!tenantResponse.ok) {
        const errorText = await tenantResponse.text();
        throw errorText;
    }
};
exports.FusionAuthTenantCreation = FusionAuthTenantCreation;
const FusionAuthTenantDeletion = async (tenantId) => {
    await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/tenant/${tenantId}`, {
        method: 'DELETE',
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
        },
    });
};
exports.FusionAuthTenantDeletion = FusionAuthTenantDeletion;
const FusionAuthApplicationCreationWithRole = async (applicationId, tenantId, roles, applicationName) => {
    const applicationResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/application/${applicationId}`, {
        method: 'POST',
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
            'Content-Type': 'application/json',
            'X-FusionAuth-TenantId': tenantId,
        },
        body: JSON.stringify({
            application: {
                id: applicationId,
                name: applicationName,
                roles,
                jwtConfiguration: {
                    enabled: true,
                    timeToLiveInSeconds: process.env.FUSIONAUTH_ACCESSTOKEN_EXPIRY_TIME,
                    refreshTokenTimeToLiveInMinutes: process.env.FUSIONAUTH_REFRESHTOKEN_EXPIRY_TIME,
                    refreshTokenUsagePolicy: 'Reusable',
                },
                oauthConfiguration: {
                    generateRefreshTokens: true,
                    refreshTokenTimeToLiveInMinutes: process.env.FUSIONAUTH_REFRESHTOKEN_EXPIRY_TIME,
                    enabledGrants: ['password', 'refresh_token'],
                    clientAuthenticationPolicy: 'NotRequired',
                    clientSecret: null,
                },
            },
        }),
    });
    if (!applicationResponse.ok) {
        const errorText = await applicationResponse.text();
        throw errorText;
    }
    const data = await applicationResponse.json();
    return data;
};
exports.FusionAuthApplicationCreationWithRole = FusionAuthApplicationCreationWithRole;
const FusionAuthApplicationDeletion = async (applicationId) => {
    await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/application/${applicationId}?hardDelete=true`, {
        method: 'DELETE',
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
        },
    });
};
exports.FusionAuthApplicationDeletion = FusionAuthApplicationDeletion;
const FusionAutRoleCRUDAlongWithApp = async (applicationId, roleId, roleName, methodName) => {
    const options = {
        method: methodName,
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
            'Content-Type': 'application/json',
        },
    };
    if (methodName !== 'DELETE') {
        options.body = JSON.stringify({
            role: { name: roleName },
        });
    }
    const response = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/application/${applicationId}/role/${roleId}`, options);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`FusionAuth error: ${errorText}`);
    }
};
exports.FusionAutRoleCRUDAlongWithApp = FusionAutRoleCRUDAlongWithApp;
const FusionAuthUserCreationWithAppAndRole = async (tenantId, userId, applicationId, firstName, lastName, userName, email, password, roles, mobile) => {
    const userResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/user/registration/${userId}`, {
        method: 'POST',
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
            'Content-Type': 'application/json',
            'X-FusionAuth-TenantId': tenantId,
        },
        body: JSON.stringify({
            user: {
                firstName: firstName,
                lastName: lastName,
                username: userName,
                phoneNumber: mobile,
                email: email,
                password: password,
            },
            registration: {
                applicationId: applicationId,
                roles,
            },
        }),
    });
    if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw errorText;
    }
};
exports.FusionAuthUserCreationWithAppAndRole = FusionAuthUserCreationWithAppAndRole;
const FusionAuthUserDeletion = async (userId) => {
    await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/user/${userId}?hardDelete=true`, {
        method: 'DELETE',
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
        },
    });
};
exports.FusionAuthUserDeletion = FusionAuthUserDeletion;
const FusionAuthUserCreation = async (tenantId, userId, firstName, lastName, userName, email, password, methjodName, mobile) => {
    const userResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/user/${userId}`, {
        method: methjodName,
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
            'Content-Type': 'application/json',
            'X-FusionAuth-TenantId': tenantId,
        },
        body: JSON.stringify({
            user: {
                firstName: firstName,
                lastName: lastName,
                username: userName,
                phoneNumber: mobile,
                email: email,
                password: password,
            },
        }),
    });
    if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw errorText;
    }
};
exports.FusionAuthUserCreation = FusionAuthUserCreation;
const FusionAuthUserApplicatonGet = async (tenantId, userId, applicationId) => {
    try {
        const userResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/user/registration/${userId}?applicationId=${applicationId}`, {
            method: 'GET',
            headers: {
                Authorization: process.env.FUSIONAUTH_APIKEY,
                'Content-Type': 'application/json',
                'X-FusionAuth-TenantId': tenantId,
            },
        });
        if (userResponse.status !== 200) {
            return {
                isNotExist: true,
            };
        }
        return await userResponse.json();
    }
    catch (err) {
        throw err;
    }
};
exports.FusionAuthUserApplicatonGet = FusionAuthUserApplicatonGet;
const FusionAuthApplicatonAssign = async (tenantId, userId, applicationId, firstName, lastName, userName, email, methodName, roles, mobile) => {
    try {
        const userResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/user/registration/${userId}`, {
            method: methodName,
            headers: {
                Authorization: process.env.FUSIONAUTH_APIKEY,
                'Content-Type': 'application/json',
                'X-FusionAuth-TenantId': tenantId,
            },
            body: JSON.stringify({
                registration: {
                    applicationId: applicationId,
                    roles: roles,
                },
            }),
        });
        if (!userResponse.ok) {
            const errorText = await userResponse.text();
            throw errorText;
        }
    }
    catch (err) {
        throw err;
    }
};
exports.FusionAuthApplicatonAssign = FusionAuthApplicatonAssign;
const FusionAuthUserRoleCreation = async (tenantId, userId, applicationId, methodName, roles) => {
    const userResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/user/registration/${userId}`, {
        method: methodName,
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
            'Content-Type': 'application/json',
            'X-FusionAuth-TenantId': tenantId,
        },
        body: JSON.stringify({
            registration: {
                applicationId: applicationId,
                roles,
            },
        }),
    });
    if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw errorText;
    }
};
exports.FusionAuthUserRoleCreation = FusionAuthUserRoleCreation;
const FusionAuthUserEdition = async (userId, firstName, lastName) => {
    const userResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                firstName: firstName,
                lastName: lastName,
            },
        }),
    });
    if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw errorText;
    }
};
exports.FusionAuthUserEdition = FusionAuthUserEdition;
const FusionAuthUserGet = async (userId) => {
    const userResponse = await fetch(`${process.env.FUSIONAUTH_BASEURL}/api/user/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: process.env.FUSIONAUTH_APIKEY,
            'Content-Type': 'application/json',
        },
    });
    if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw errorText;
    }
    const data = await userResponse.json();
    return data;
};
exports.FusionAuthUserGet = FusionAuthUserGet;
//# sourceMappingURL=fusionAuth.api.js.map