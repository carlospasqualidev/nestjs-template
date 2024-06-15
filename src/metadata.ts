/* eslint-disable */
export default async () => {
    const t = {
        ["./entities/user/user.entity"]: await import("./entities/user/user.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./entities/user/user.entity"), { "UserEntity": { id: { required: false, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, image: { required: false, type: () => String, nullable: true }, password: { required: true, type: () => String }, refreshToken: { required: false, type: () => String, nullable: true }, isBlocked: { required: false, type: () => Boolean, default: false }, isDeleted: { required: false, type: () => Boolean, default: false } } }], [import("./dtos/user/user-update.dto"), { "UserUpdateDTO": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, image: { required: false, type: () => String, nullable: true } } }], [import("./dtos/user/user-create.dto"), { "UserCreateDTO": { name: { required: true, type: () => String }, email: { required: true, type: () => String }, image: { required: false, type: () => String, nullable: true }, password: { required: true, type: () => String } } }], [import("./dtos/authentication/authentication.dto"), { "AuthenticationDTO": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./dtos/authentication/authentication-return.dto"), { "AuthenticationReturnDTO": { accessToken: { required: true, type: () => String } } }], [import("./entities/user-permission/user-permission.entity"), { "UserPermissionEntity": { id: { required: false, type: () => String }, permission: { required: true, type: () => Object }, userId: { required: true, type: () => String }, createdAt: { required: false, type: () => Date }, updatedAt: { required: false, type: () => Date } } }], [import("./dtos/user-permission/user-permission-create.dto"), { "UserPermissionCreateDTO": { permission: { required: true, type: () => Object }, userId: { required: true, type: () => String } } }], [import("./dtos/user/user-find-by-id.dto"), { "UserFindByIdDTO": { id: { required: true, type: () => String } } }], [import("./dtos/user/user-delete-by-id.dto"), { "UserDeleteByIdDTO": { id: { required: true, type: () => String } } }], [import("./dtos/user-permission/user-permission-delete-by-id.dto"), { "UserPermissionDeleteByIdDTO": { id: { required: true, type: () => String } } }]], "controllers": [[import("./controllers/user/user.controller"), { "UserController": { "Create": { type: t["./entities/user/user.entity"].UserEntity }, "Update": { type: t["./entities/user/user.entity"].UserEntity }, "findById": { type: t["./entities/user/user.entity"].UserEntity }, "deleteById": {}, "FindById": { type: t["./entities/user/user.entity"].UserEntity }, "DeleteById": {} } }], [import("./controllers/user-permission/user-permission.controller"), { "UserPermissionController": { "Create": {}, "DeleteById": {} } }]] } };
};