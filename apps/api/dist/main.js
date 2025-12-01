/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const msg_module_1 = __webpack_require__(8);
const app_controller_1 = __webpack_require__(15);
const app_service_1 = __webpack_require__(16);
const job_application_module_1 = __webpack_require__(20);
const review_module_1 = __webpack_require__(24);
const service_module_1 = __webpack_require__(29);
const service_request_module_1 = __webpack_require__(34);
const service_listing_module_1 = __webpack_require__(39);
const user_module_1 = __webpack_require__(44);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            msg_module_1.MsgModule,
            service_request_module_1.ServiceRequestModule,
            service_listing_module_1.ServiceListingModule,
            service_module_1.ServiceModule,
            review_module_1.ReviewsModule,
            job_application_module_1.JobApplicationModule, // Job application management
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MsgModule = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
const msg_controller_1 = __webpack_require__(11);
const msg_service_1 = __webpack_require__(14);
let MsgModule = class MsgModule {
};
exports.MsgModule = MsgModule;
exports.MsgModule = MsgModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [msg_controller_1.MsgController],
        providers: [msg_service_1.MsgService, supabase_service_1.SupabaseService],
        exports: [msg_service_1.MsgService],
    })
], MsgModule);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupabaseService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_js_1 = __webpack_require__(10);
let SupabaseService = class SupabaseService {
    constructor() {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required');
        }
        // Use service role key for backend operations - this bypasses RLS and has full access
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
        // Admin client is the same as regular client for server-side operations
        this.adminClient = this.supabase;
    }
    getClient() {
        return this.supabase;
    }
    getAdminClient() {
        return this.adminClient;
    }
    // Create authenticated client with user token (for user-specific operations)
    createUserClient(token) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Missing Supabase environment variables for user client');
        }
        return (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            auth: {
                persistSession: false,
            },
        });
    }
    get auth() {
        return this.supabase.auth;
    }
    get adminAuth() {
        return this.adminClient.auth;
    }
    get from() {
        return this.supabase.from.bind(this.supabase);
    }
    // Create a Supabase client with a specific user's access token
    createClientWithToken(accessToken) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Missing Supabase environment variables');
        }
        return (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        });
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], SupabaseService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MsgController = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(5);
const msg_dto_1 = __webpack_require__(12);
const msg_service_1 = __webpack_require__(14);
let MsgController = class MsgController {
    constructor(msgService) {
        this.msgService = msgService;
    }
    async sendMessage(authorization, userId, createMessageDto) {
        const token = authorization?.replace('Bearer ', '');
        return this.msgService.createMessage(token, userId, createMessageDto);
    }
    async getThreads(authorization, userId) {
        const token = authorization?.replace('Bearer ', '');
        return this.msgService.getThreads(token, userId);
    }
    async getThreadMessages(authorization, userId, otherUserId, limit) {
        const token = authorization?.replace('Bearer ', '');
        return this.msgService.getThreadMessages(token, userId, otherUserId, limit);
    }
};
exports.MsgController = MsgController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send a new message' }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'x-user-id',
        description: 'Sender user ID',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: msg_dto_1.MessageResponseDto }),
    tslib_1.__param(0, (0, common_1.Headers)('authorization')),
    tslib_1.__param(1, (0, common_1.Headers)('x-user-id')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_b = typeof msg_dto_1.CreateMessageDto !== "undefined" && msg_dto_1.CreateMessageDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MsgController.prototype, "sendMessage", null);
tslib_1.__decorate([
    (0, common_1.Get)('threads'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all conversation threads for current user' }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({ name: 'x-user-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [msg_dto_1.ThreadResponseDto] }),
    tslib_1.__param(0, (0, common_1.Headers)('authorization')),
    tslib_1.__param(1, (0, common_1.Headers)('x-user-id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MsgController.prototype, "getThreads", null);
tslib_1.__decorate([
    (0, common_1.Get)('threads/:otherUserId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get messages in a conversation thread' }),
    (0, swagger_1.ApiParam)({ name: 'otherUserId', description: 'Other user ID' }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    }),
    (0, swagger_1.ApiHeader)({ name: 'x-user-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, type: msg_dto_1.MessageListResponseDto }),
    tslib_1.__param(0, (0, common_1.Headers)('authorization')),
    tslib_1.__param(1, (0, common_1.Headers)('x-user-id')),
    tslib_1.__param(2, (0, common_1.Param)('otherUserId')),
    tslib_1.__param(3, (0, common_1.Query)('limit')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Number]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], MsgController.prototype, "getThreadMessages", null);
exports.MsgController = MsgController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Messages'),
    (0, common_1.Controller)('messages'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof msg_service_1.MsgService !== "undefined" && msg_service_1.MsgService) === "function" ? _a : Object])
], MsgController);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageListResponseDto = exports.ThreadResponseDto = exports.MessageResponseDto = exports.CreateMessageDto = void 0;
const tslib_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(13);
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: '327b33ef-3796-4287-b8f3-d4e1f18d23bd',
        description: 'Receiver user ID (e.g., Randell Fabico for testing)',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateMessageDto.prototype, "receiver_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hello! Are you available?' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
class MessageResponseDto {
}
exports.MessageResponseDto = MessageResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MessageResponseDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MessageResponseDto.prototype, "sender_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MessageResponseDto.prototype, "receiver_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MessageResponseDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MessageResponseDto.prototype, "created_at", void 0);
class ThreadResponseDto {
}
exports.ThreadResponseDto = ThreadResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ThreadResponseDto.prototype, "other_user_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ThreadResponseDto.prototype, "other_user_name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ThreadResponseDto.prototype, "other_user_avatar", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ThreadResponseDto.prototype, "last_message", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ThreadResponseDto.prototype, "last_message_at", void 0);
class MessageListResponseDto {
}
exports.MessageListResponseDto = MessageListResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [MessageResponseDto] }),
    tslib_1.__metadata("design:type", Array)
], MessageListResponseDto.prototype, "messages", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], MessageListResponseDto.prototype, "total", void 0);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var MsgService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MsgService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
let MsgService = MsgService_1 = class MsgService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.logger = new common_1.Logger(MsgService_1.name);
    }
    async createMessage(accessToken, senderId, createMessageDto) {
        // Use user's token to respect RLS policies
        const userSupabase = this.supabaseService.createClientWithToken(accessToken);
        const { data, error } = await userSupabase
            .from('messages')
            .insert({
            sender_id: senderId,
            receiver_id: createMessageDto.receiver_id,
            content: createMessageDto.content,
        })
            .select()
            .single();
        if (error) {
            this.logger.error('Error creating message:', error);
            throw new common_1.HttpException('Failed to send message', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    async getThreadMessages(accessToken, userId, otherUserId, limit = 50) {
        // Use user's token to respect RLS policies
        const userSupabase = this.supabaseService.createClientWithToken(accessToken);
        const { data, error, count } = await userSupabase
            .from('messages')
            .select('*', { count: 'exact' })
            .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) {
            this.logger.error('Error fetching messages:', error);
            throw new common_1.HttpException('Failed to fetch messages', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            messages: data,
            total: count || 0,
        };
    }
    async getThreads(accessToken, userId) {
        // Use user's token to respect RLS policies
        const userSupabase = this.supabaseService.createClientWithToken(accessToken);
        const { data, error } = await userSupabase
            .from('messages')
            .select('*, sender:sender_id(id, full_name, avatar_url), receiver:receiver_id(id, full_name, avatar_url)')
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            .order('created_at', { ascending: false });
        if (error) {
            this.logger.error('Error fetching threads:', error);
            throw new common_1.HttpException('Failed to fetch conversations', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const threadsMap = new Map();
        for (const message of data) {
            const otherUserId = message.sender_id === userId ? message.receiver_id : message.sender_id;
            const otherUser = message.sender_id === userId ? message.receiver : message.sender;
            if (!threadsMap.has(otherUserId)) {
                threadsMap.set(otherUserId, {
                    other_user_id: otherUserId,
                    other_user_name: otherUser?.full_name || 'Unknown',
                    other_user_avatar: otherUser?.avatar_url || null,
                    last_message: message.content,
                    last_message_at: message.created_at,
                });
            }
        }
        return Array.from(threadsMap.values());
    }
    async getUnreadCount(_userId) {
        // Simplified - just return 0 for now since we removed is_read
        return 0;
    }
};
exports.MsgService = MsgService;
exports.MsgService = MsgService = MsgService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object])
], MsgService);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(16);
const public_decorator_1 = __webpack_require__(17);
const app_dto_1 = __webpack_require__(19);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
    getHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get application data' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved application data',
        type: app_dto_1.AppDataResponseDto,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof app_dto_1.AppDataResponseDto !== "undefined" && app_dto_1.AppDataResponseDto) === "function" ? _b : Object)
], AppController.prototype, "getData", null);
tslib_1.__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiTags)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health check endpoint' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Health check successful',
        type: app_dto_1.HealthResponseDto,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof app_dto_1.HealthResponseDto !== "undefined" && app_dto_1.HealthResponseDto) === "function" ? _c : Object)
], AppController.prototype, "getHealth", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('hanapp'),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = void 0;
const common_1 = __webpack_require__(3);
const auth_guard_1 = __webpack_require__(18);
const Public = () => (0, common_1.SetMetadata)(auth_guard_1.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(4);
const supabase_service_1 = __webpack_require__(9);
// Decorator to mark routes as public (skip auth)
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => {
    // This is a workaround to create a custom decorator without @nestjs/common's SetMetadata
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target, propertyKey, descriptor) => {
        if (descriptor) {
            Reflect.defineMetadata(exports.IS_PUBLIC_KEY, true, descriptor.value);
        }
        return descriptor;
    };
};
exports.Public = Public;
let AuthGuard = class AuthGuard {
    constructor(supabaseService, reflector) {
        this.supabaseService = supabaseService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        // Check if route is marked as public
        const isPublic = this.reflector.getAllAndOverride(exports.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No authentication token provided');
        }
        try {
            // Verify the JWT token with Supabase
            const { data, error } = await this.supabaseService.auth.getUser(token);
            if (error || !data.user) {
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
            // Attach user to request object for use in controllers
            request.user = data.user;
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    extractTokenFromHeader(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return undefined;
        }
        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], AuthGuard);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthResponseDto = exports.AppDataResponseDto = void 0;
const tslib_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
/**
 * Response DTO for application data endpoint
 */
class AppDataResponseDto {
}
exports.AppDataResponseDto = AppDataResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message from the API',
        example: 'Hello API',
    }),
    tslib_1.__metadata("design:type", String)
], AppDataResponseDto.prototype, "message", void 0);
/**
 * Response DTO for health check endpoint
 */
class HealthResponseDto {
}
exports.HealthResponseDto = HealthResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Health status of the API',
        example: 'OK',
    }),
    tslib_1.__metadata("design:type", String)
], HealthResponseDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp of the health check',
        example: '2025-10-28T12:00:00.000Z',
    }),
    tslib_1.__metadata("design:type", String)
], HealthResponseDto.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Uptime of the API in seconds',
        example: 12345,
    }),
    tslib_1.__metadata("design:type", Number)
], HealthResponseDto.prototype, "uptime", void 0);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobApplicationModule = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
const job_application_controller_1 = __webpack_require__(21);
const job_application_service_1 = __webpack_require__(23);
let JobApplicationModule = class JobApplicationModule {
};
exports.JobApplicationModule = JobApplicationModule;
exports.JobApplicationModule = JobApplicationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [job_application_controller_1.JobApplicationController],
        providers: [job_application_service_1.JobApplicationService, supabase_service_1.SupabaseService],
        exports: [job_application_service_1.JobApplicationService],
    })
], JobApplicationModule);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobApplicationController = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const create_job_application_dto_1 = __webpack_require__(22);
const job_application_service_1 = __webpack_require__(23);
let JobApplicationController = class JobApplicationController {
    constructor(jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }
    create(createDto, authHeader) {
        const token = authHeader?.replace('Bearer ', '');
        return this.jobApplicationService.create(createDto, createDto.providerId, token);
    }
    findByProvider(providerId) {
        return this.jobApplicationService.findByProvider(providerId);
    }
    findByClient(clientId) {
        return this.jobApplicationService.findByClient(clientId);
    }
    updateStatus(id, status, userId, authHeader) {
        const token = authHeader?.replace('Bearer ', '');
        return this.jobApplicationService.updateStatus(id, status, userId, token);
    }
};
exports.JobApplicationController = JobApplicationController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Headers)('authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_job_application_dto_1.CreateJobApplicationDto !== "undefined" && create_job_application_dto_1.CreateJobApplicationDto) === "function" ? _b : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], JobApplicationController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)('sent'),
    tslib_1.__param(0, (0, common_1.Query)('providerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], JobApplicationController.prototype, "findByProvider", null);
tslib_1.__decorate([
    (0, common_1.Get)('received'),
    tslib_1.__param(0, (0, common_1.Query)('clientId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], JobApplicationController.prototype, "findByClient", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/status'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)('status')),
    tslib_1.__param(2, (0, common_1.Body)('userId')),
    tslib_1.__param(3, (0, common_1.Headers)('authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], JobApplicationController.prototype, "updateStatus", null);
exports.JobApplicationController = JobApplicationController = tslib_1.__decorate([
    (0, common_1.Controller)('job-applications'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof job_application_service_1.JobApplicationService !== "undefined" && job_application_service_1.JobApplicationService) === "function" ? _a : Object])
], JobApplicationController);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateJobApplicationDto = void 0;
const tslib_1 = __webpack_require__(7);
const class_validator_1 = __webpack_require__(13);
class CreateJobApplicationDto {
}
exports.CreateJobApplicationDto = CreateJobApplicationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateJobApplicationDto.prototype, "serviceRequestId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateJobApplicationDto.prototype, "qualifications", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateJobApplicationDto.prototype, "experience", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateJobApplicationDto.prototype, "providerId", void 0);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JobApplicationService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
let JobApplicationService = class JobApplicationService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createDto, providerId, token) {
        // Use service client for service request lookup to bypass RLS
        const serviceClient = this.supabaseService.getClient();
        // First, get the service request to find the client_id
        const { data: serviceRequest, error: fetchError } = await serviceClient
            .from('service_requests')
            .select('client_id')
            .eq('id', createDto.serviceRequestId)
            .maybeSingle();
        if (fetchError || !serviceRequest) {
            throw new common_1.HttpException(`Service request not found: ${fetchError?.message || 'No data'}`, common_1.HttpStatus.NOT_FOUND);
        }
        // Use user client for job application operations
        const supabase = token
            ? this.supabaseService.createUserClient(token)
            : serviceClient;
        // Check if provider already applied to this service request
        const { data: existingApplication } = await supabase
            .from('job_applications')
            .select('id')
            .eq('service_request_id', createDto.serviceRequestId)
            .eq('provider_id', providerId)
            .maybeSingle();
        if (existingApplication) {
            throw new common_1.HttpException('You have already applied to this job', common_1.HttpStatus.CONFLICT);
        }
        // Create the job application
        const { data, error } = await supabase
            .from('job_applications')
            .insert({
            service_request_id: createDto.serviceRequestId,
            provider_id: providerId,
            client_id: serviceRequest.client_id,
            qualifications: createDto.qualifications,
            experience: createDto.experience,
            status: 'pending',
        })
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to create job application: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    // Get applications sent by a provider (for "sent" tab)
    async findByProvider(providerId) {
        // Use service client to bypass RLS restrictions on service_requests
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('job_applications')
            .select(`
        *,
        service_requests(
          id,
          title,
          description,
          rate,
          job_location,
          date,
          time,
          time_2,
          images,
          category_id,
          client_id,
          status,
          is_provider_finished
        )
      `)
            .eq('provider_id', providerId)
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.HttpException(`Failed to fetch applications: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    // Get applications received by a client (for "received" tab)
    async findByClient(clientId) {
        // Use service client to bypass RLS restrictions on service_requests
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('job_applications')
            .select(`
        *,
        service_requests(
          id,
          title,
          description,
          rate,
          job_location,
          date,
          time,
          time_2,
          images,
          category_id,
          status,
          is_provider_finished
        )
      `)
            .eq('client_id', clientId)
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.HttpException(`Failed to fetch received applications: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    // Update application status (accept/reject)
    async updateStatus(applicationId, status, userId, _token) {
        const supabase = this.supabaseService.getClient();
        // Verify the user is the client who owns the service request
        const { data: application, error: fetchError } = await supabase
            .from('job_applications')
            .select('client_id')
            .eq('id', applicationId)
            .single();
        if (fetchError || !application) {
            throw new common_1.HttpException('Application not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (application.client_id !== userId) {
            throw new common_1.HttpException('You do not have permission to update this application', common_1.HttpStatus.FORBIDDEN);
        }
        const { data, error } = await supabase
            .from('job_applications')
            .update({ status })
            .eq('id', applicationId)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to update application: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
};
exports.JobApplicationService = JobApplicationService;
exports.JobApplicationService = JobApplicationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object])
], JobApplicationService);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsModule = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
const review_controller_1 = __webpack_require__(25);
const review_service_1 = __webpack_require__(28);
let ReviewsModule = class ReviewsModule {
};
exports.ReviewsModule = ReviewsModule;
exports.ReviewsModule = ReviewsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [review_controller_1.ReviewsController],
        providers: [review_service_1.ReviewsService, supabase_service_1.SupabaseService],
        exports: [review_service_1.ReviewsService],
    })
], ReviewsModule);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsController = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(5);
const current_user_decorator_1 = __webpack_require__(26);
const auth_guard_1 = __webpack_require__(18);
const review_dto_1 = __webpack_require__(27);
const review_service_1 = __webpack_require__(28);
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    // ===============================
    // CREATE REVIEW
    // ===============================
    async createReview(dto, user) {
        return this.reviewsService.createReview(dto, user.id);
    }
    // ===============================
    // UPDATE REVIEW
    // ===============================
    async updateReview(reviewId, dto, user) {
        return this.reviewsService.updateReview(reviewId, dto, user.id);
    }
    // ===============================
    // DELETE REVIEW
    // ===============================
    async deleteReview(reviewId, user) {
        return this.reviewsService.deleteReview(reviewId, user.id);
    }
    // ===============================
    // GET REVIEWS BY SERVICE ID
    // ===============================
    async getReviewsByServiceId(serviceId) {
        return this.reviewsService.getReviewsByServiceId(serviceId);
    }
    // ===============================
    // GET REVIEWS BY PROVIDER ID
    // ===============================
    async getReviewsByProviderId(providerId) {
        return this.reviewsService.getReviewsByServiceId(providerId);
    }
    // ===============================
    // GET REVIEWS BY SERVICE LISTING ID
    // ===============================
    async getReviewsByServiceListingId(listingId) {
        return this.reviewsService.getReviewsByServiceListingId(listingId);
    }
};
exports.ReviewsController = ReviewsController;
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new review (requires authentication)' }),
    (0, swagger_1.ApiBody)({ type: review_dto_1.CreateReviewDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Review created successfully',
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, current_user_decorator_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof review_dto_1.CreateReviewDto !== "undefined" && review_dto_1.CreateReviewDto) === "function" ? _b : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewsController.prototype, "createReview", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Patch)(':reviewId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update an existing review (requires authentication)',
    }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'Review ID' }),
    (0, swagger_1.ApiBody)({ type: review_dto_1.UpdateReviewDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Review updated successfully',
    }),
    tslib_1.__param(0, (0, common_1.Param)('reviewId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, current_user_decorator_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof review_dto_1.UpdateReviewDto !== "undefined" && review_dto_1.UpdateReviewDto) === "function" ? _c : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewsController.prototype, "updateReview", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)(':reviewId/delete'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete an existing review (requires authentication)',
    }),
    (0, swagger_1.ApiParam)({ name: 'reviewId', description: 'Review ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Review deleted successfully',
    }),
    tslib_1.__param(0, (0, common_1.Param)('reviewId')),
    tslib_1.__param(1, (0, current_user_decorator_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewsController.prototype, "deleteReview", null);
tslib_1.__decorate([
    (0, common_1.Get)('service/:serviceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews by service ID (public)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reviews retrieved successfully',
    }),
    tslib_1.__param(0, (0, common_1.Param)('serviceId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviewsByServiceId", null);
tslib_1.__decorate([
    (0, common_1.Get)('provider/:providerId') // temp route
    ,
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews by provider ID (public)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reviews retrieved successfully',
    }),
    tslib_1.__param(0, (0, common_1.Param)('providerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviewsByProviderId", null);
tslib_1.__decorate([
    (0, common_1.Get)('listing/:listingId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews by service listing ID (public)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reviews retrieved successfully',
    }),
    tslib_1.__param(0, (0, common_1.Param)('listingId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviewsByServiceListingId", null);
exports.ReviewsController = ReviewsController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Reviews'),
    (0, common_1.Controller)('reviews'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof review_service_1.ReviewsService !== "undefined" && review_service_1.ReviewsService) === "function" ? _a : Object])
], ReviewsController);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(3);
/**
 * Decorator to extract the current authenticated user from the request
 * Usage: @CurrentUser() user: User
 */
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateReviewDto = exports.CreateReviewDto = void 0;
const tslib_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(13);
class CreateReviewDto {
}
exports.CreateReviewDto = CreateReviewDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "booking_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "service_listing_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
class UpdateReviewDto {
}
exports.UpdateReviewDto = UpdateReviewDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateReviewDto.prototype, "comment", void 0);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
let ReviewsService = class ReviewsService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    // ======================================================
    // CHECK IF USER IS THE CLIENT OF THAT BOOKING
    // ======================================================
    async validateBookingOwner(bookingId, userId) {
        const { data, error } = await this.supabaseService
            .from('bookings')
            .select('client_id')
            .eq('id', bookingId)
            .single();
        if (error || !data) {
            throw new common_1.HttpException('Booking not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (data.client_id !== userId) {
            throw new common_1.HttpException('Only the client who made the booking can create or modify the review', common_1.HttpStatus.FORBIDDEN);
        }
    }
    // ======================================================
    // CHECK IF USER IS AUTHOR OF REVIEW
    // ======================================================
    async validateReviewOwner(reviewId, userId) {
        const { data, error } = await this.supabaseService
            .from('reviews')
            .select('client_id')
            .eq('id', reviewId)
            .single();
        if (error || !data) {
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (data.client_id !== userId) {
            throw new common_1.HttpException('You are not the owner of this review', common_1.HttpStatus.FORBIDDEN);
        }
    }
    // ======================================
    // CREATE REVIEW
    // ======================================
    async createReview(dto, userId) {
        // Validate that either booking_id or service_listing_id is provided
        if (!dto.booking_id && !dto.service_listing_id) {
            throw new common_1.HttpException('Either booking_id or service_listing_id must be provided', common_1.HttpStatus.BAD_REQUEST);
        }
        let providerId;
        let serviceId = null;
        let serviceListingId = null;
        // Handle booking-based review
        if (dto.booking_id) {
            // Validate booking ownership
            await this.validateBookingOwner(dto.booking_id, userId);
            // Get service_id and provider_id from booking
            const { data: booking, error: bookingError } = await this.supabaseService
                .from('bookings')
                .select('service_id, provider_id')
                .eq('id', dto.booking_id)
                .single();
            if (bookingError || !booking) {
                throw new common_1.HttpException('Booking not found', common_1.HttpStatus.NOT_FOUND);
            }
            providerId = booking.provider_id;
            serviceId = booking.service_id;
        }
        // Handle service listing-based review
        else if (dto.service_listing_id) {
            // Get provider_id from service_listing
            const { data: listing, error: listingError } = await this.supabaseService
                .from('service_listings')
                .select('provider_id')
                .eq('id', dto.service_listing_id)
                .single();
            if (listingError || !listing) {
                throw new common_1.HttpException('Service listing not found', common_1.HttpStatus.NOT_FOUND);
            }
            providerId = listing.provider_id;
            serviceListingId = dto.service_listing_id;
        }
        else {
            throw new common_1.HttpException('Invalid review data', common_1.HttpStatus.BAD_REQUEST);
        }
        const { data, error } = await this.supabaseService
            .from('reviews')
            .insert({
            booking_id: dto.booking_id ?? null,
            service_listing_id: serviceListingId,
            service_id: serviceId,
            provider_id: providerId,
            client_id: userId,
            rating: dto.rating,
            comment: dto.comment ?? null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to create review: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            message: 'Review created successfully',
            review: data,
        };
    }
    // ======================================
    // UPDATE REVIEW
    // ======================================
    async updateReview(reviewId, dto, userId) {
        // Validate review ownership
        await this.validateReviewOwner(reviewId, userId);
        const { data, error } = await this.supabaseService
            .from('reviews')
            .update({
            ...dto,
            updated_at: new Date().toISOString(),
        })
            .eq('id', reviewId)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to update review`, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            message: 'Review updated successfully',
            review: data,
        };
    }
    // ======================================
    // UPDATE REVIEW
    // ======================================
    async deleteReview(reviewId, userId) {
        // Validate review ownership
        await this.validateReviewOwner(reviewId, userId);
        const { error } = await this.supabaseService
            .from('reviews')
            .delete()
            .eq('id', reviewId);
        if (error) {
            throw new common_1.HttpException(`Failed to delete review`, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            message: 'Review deleted successfully',
        };
    }
    // ======================================
    // GET REVIEWS BY SERVICE ID
    // ======================================
    async getReviewsByServiceId(serviceId) {
        const { data, error } = await this.supabaseService
            .from('reviews')
            .select('*')
            .eq('service_id', serviceId)
            .order('created_at', { ascending: false }); // newest first
        if (error) {
            throw new common_1.HttpException(`Failed to fetch reviews: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            reviews: data,
        };
    }
    // ======================================
    // GET REVIEWS BY PROVIDER ID
    // ======================================
    async getReviewsByProviderId(providerId) {
        const { data, error } = await this.supabaseService
            .from('reviews')
            .select('*')
            .eq('provider_id', providerId)
            .order('created_at', { ascending: false }); // newest first
        if (error) {
            throw new common_1.HttpException(`Failed to fetch reviews: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            reviews: data,
        };
    }
    // ======================================
    // GET REVIEWS BY SERVICE LISTING ID
    // ======================================
    async getReviewsByServiceListingId(serviceListingId) {
        const { data, error } = await this.supabaseService
            .from('reviews')
            .select(`
        *,
        client:client_id (
          full_name,
          avatar_url
        )
      `)
            .eq('service_listing_id', serviceListingId)
            .order('created_at', { ascending: false }); // newest first
        if (error) {
            throw new common_1.HttpException(`Failed to fetch reviews: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            reviews: data,
        };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object])
], ReviewsService);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceModule = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
const service_controller_1 = __webpack_require__(30);
const service_service_1 = __webpack_require__(33);
let ServiceModule = class ServiceModule {
};
exports.ServiceModule = ServiceModule;
exports.ServiceModule = ServiceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [service_controller_1.ServiceController],
        providers: [service_service_1.ServiceService, supabase_service_1.SupabaseService],
        exports: [service_service_1.ServiceService],
    })
], ServiceModule);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceController = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const create_service_dto_1 = __webpack_require__(31);
const update_service_dto_1 = __webpack_require__(32);
const service_service_1 = __webpack_require__(33);
let ServiceController = class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    create(createDto, authHeader) {
        // Extract token from "Bearer <token>"
        const token = authHeader?.replace('Bearer ', '');
        return this.serviceService.create(createDto, createDto.listingId, token);
    }
    findAll(listingId) {
        return this.serviceService.findAll(listingId);
    }
    findOne(id) {
        return this.serviceService.findOne(id);
    }
    update(id, updateDto) {
        return this.serviceService.update(id, updateDto);
    }
    remove(id) {
        return this.serviceService.remove(id);
    }
};
exports.ServiceController = ServiceController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Headers)('authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_service_dto_1.CreateServiceDto !== "undefined" && create_service_dto_1.CreateServiceDto) === "function" ? _b : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('listingId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof update_service_dto_1.UpdateServiceDto !== "undefined" && update_service_dto_1.UpdateServiceDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceController.prototype, "remove", null);
exports.ServiceController = ServiceController = tslib_1.__decorate([
    (0, common_1.Controller)('services'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_service_1.ServiceService !== "undefined" && service_service_1.ServiceService) === "function" ? _a : Object])
], ServiceController);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateServiceDto = void 0;
const tslib_1 = __webpack_require__(7);
const class_validator_1 = __webpack_require__(13);
class CreateServiceDto {
}
exports.CreateServiceDto = CreateServiceDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateServiceDto.prototype, "rate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "charge", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceDto.prototype, "listingId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateServiceDto.prototype, "isAddon", void 0);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateServiceDto = void 0;
const tslib_1 = __webpack_require__(7);
const class_validator_1 = __webpack_require__(13);
class UpdateServiceDto {
}
exports.UpdateServiceDto = UpdateServiceDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateServiceDto.prototype, "rate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceDto.prototype, "charge", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateServiceDto.prototype, "isAddon", void 0);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
let ServiceService = class ServiceService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createDto, listingId, token) {
        const supabase = token
            ? this.supabaseService.createUserClient(token)
            : this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_listing_details')
            .insert({
            title: createDto.title,
            description: createDto.description,
            rate: createDto.rate,
            charge: createDto.charge,
            listing_id: listingId,
            is_addon: createDto.isAddon,
        })
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to create service: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    async findAll(listingId) {
        const supabase = this.supabaseService.getClient();
        let query = supabase
            .from('service_listing_details')
            .select(`*`)
            .order('created_at', { ascending: false });
        if (listingId) {
            query = query.eq('listing_id', listingId);
        }
        const { data, error } = await query;
        if (error) {
            throw new common_1.HttpException(`Failed to fetch services: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    async findOne(id) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_listing_details')
            .select(`*`)
            .eq('id', id)
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to fetch service: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    async update(id, updateDto) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_listing_details')
            .update(updateDto)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to update service: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else if (!data) {
            throw new common_1.HttpException(`Service not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
    async remove(id) {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase
            .from('service_listing_details')
            .delete()
            .eq('id', id);
        if (error) {
            throw new common_1.HttpException(`Failed to delete service: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { message: 'Service deleted successfully' };
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object])
], ServiceService);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceRequestModule = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
const service_request_controller_1 = __webpack_require__(35);
const service_request_service_1 = __webpack_require__(38);
let ServiceRequestModule = class ServiceRequestModule {
};
exports.ServiceRequestModule = ServiceRequestModule;
exports.ServiceRequestModule = ServiceRequestModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [service_request_controller_1.ServiceRequestController],
        providers: [service_request_service_1.ServiceRequestService, supabase_service_1.SupabaseService],
        exports: [service_request_service_1.ServiceRequestService],
    })
], ServiceRequestModule);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceRequestController = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const create_service_request_dto_1 = __webpack_require__(36);
const update_service_request_dto_1 = __webpack_require__(37);
const service_request_service_1 = __webpack_require__(38);
let ServiceRequestController = class ServiceRequestController {
    constructor(serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }
    create(createDto, clientId, authHeader) {
        // Extract token from "Bearer <token>"
        const token = authHeader?.replace('Bearer ', '');
        return this.serviceRequestService.create(createDto, clientId, token);
    }
    findAll(clientId) {
        return this.serviceRequestService.findAll(clientId);
    }
    findByCategory(categoryId) {
        return this.serviceRequestService.findByCategory(categoryId);
    }
    findByStatus(status) {
        return this.serviceRequestService.findByStatus(status);
    }
    findPublicJobListings() {
        return this.serviceRequestService.findPublicJobListings();
    }
    findForJobListings() {
        return this.serviceRequestService.findForJobListings();
    }
    confirmBooking(id, userId, authHeader) {
        const token = authHeader?.replace('Bearer ', '');
        return this.serviceRequestService.confirmBooking(id, userId, token);
    }
    finishBooking(id, providerId, authHeader) {
        const token = authHeader?.replace('Bearer ', '');
        return this.serviceRequestService.finishBooking(id, providerId, token);
    }
    completeBooking(id, clientId, authHeader) {
        const token = authHeader?.replace('Bearer ', '');
        return this.serviceRequestService.completeBooking(id, clientId, token);
    }
    findOne(id) {
        return this.serviceRequestService.findOne(id);
    }
    update(id, updateDto) {
        return this.serviceRequestService.update(id, updateDto);
    }
    remove(id) {
        return this.serviceRequestService.remove(id);
    }
};
exports.ServiceRequestController = ServiceRequestController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Body)('clientId')),
    tslib_1.__param(2, (0, common_1.Headers)('authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_service_request_dto_1.CreateServiceRequestDto !== "undefined" && create_service_request_dto_1.CreateServiceRequestDto) === "function" ? _b : Object, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('clientId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('category/:categoryId'),
    tslib_1.__param(0, (0, common_1.Param)('categoryId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "findByCategory", null);
tslib_1.__decorate([
    (0, common_1.Get)('status/:status'),
    tslib_1.__param(0, (0, common_1.Param)('status')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "findByStatus", null);
tslib_1.__decorate([
    (0, common_1.Get)('public/job-listings'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "findPublicJobListings", null);
tslib_1.__decorate([
    (0, common_1.Get)('approved/job-listings'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "findForJobListings", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/confirm'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)('userId')),
    tslib_1.__param(2, (0, common_1.Headers)('authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "confirmBooking", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/finish'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)('providerId')),
    tslib_1.__param(2, (0, common_1.Headers)('authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "finishBooking", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/complete'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)('clientId')),
    tslib_1.__param(2, (0, common_1.Headers)('authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "completeBooking", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof update_service_request_dto_1.UpdateServiceRequestDto !== "undefined" && update_service_request_dto_1.UpdateServiceRequestDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "remove", null);
exports.ServiceRequestController = ServiceRequestController = tslib_1.__decorate([
    (0, common_1.Controller)('service-requests'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_request_service_1.ServiceRequestService !== "undefined" && service_request_service_1.ServiceRequestService) === "function" ? _a : Object])
], ServiceRequestController);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateServiceRequestDto = void 0;
const tslib_1 = __webpack_require__(7);
const class_validator_1 = __webpack_require__(13);
class CreateServiceRequestDto {
}
exports.CreateServiceRequestDto = CreateServiceRequestDto;
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)() // Allow it to be passed but not required
    ,
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "clientId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "additional_requirements", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "rate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^\+63\d{10}$/, {
        message: 'Contact must be in format +63XXXXXXXXXX',
    }),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "contact", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "contactLink", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "jobLocation", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "jobDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Time must be in HH:MM format',
    }),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "jobTime", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Time 2 must be in HH:MM format',
    }),
    tslib_1.__metadata("design:type", String)
], CreateServiceRequestDto.prototype, "jobTime2", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateServiceRequestDto.prototype, "images", void 0);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateServiceRequestDto = void 0;
const tslib_1 = __webpack_require__(7);
const class_validator_1 = __webpack_require__(13);
class UpdateServiceRequestDto {
}
exports.UpdateServiceRequestDto = UpdateServiceRequestDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceRequestDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceRequestDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateServiceRequestDto.prototype, "rate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceRequestDto.prototype, "contact", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceRequestDto.prototype, "contactLink", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceRequestDto.prototype, "jobLocation", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceRequestDto.prototype, "jobDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceRequestDto.prototype, "jobTime", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], UpdateServiceRequestDto.prototype, "images", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([
        'pending',
        'approved',
        'rejected',
        'cancelled',
        'accepted',
        'completed',
    ]),
    tslib_1.__metadata("design:type", String)
], UpdateServiceRequestDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateServiceRequestDto.prototype, "is_provider_finished", void 0);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceRequestService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
let ServiceRequestService = class ServiceRequestService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createDto, clientId, token) {
        // If token provided, create authenticated client; otherwise use regular client
        const supabase = token
            ? this.supabaseService.createUserClient(token)
            : this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_requests')
            .insert({
            client_id: clientId, // User ID from auth
            category_id: createDto.categoryId, // 1=Cleaning, 2=Tutoring, 3=Repair, 4=Delivery
            title: createDto.title,
            description: createDto.description,
            additional_requirements: createDto.additional_requirements,
            rate: createDto.rate,
            contact: createDto.contact,
            contact_link: createDto.contactLink,
            job_location: createDto.jobLocation,
            date: createDto.jobDate,
            time: createDto.jobTime,
            time_2: createDto.jobTime2,
            images: createDto.images || [],
        })
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to create service request: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    async findAll(clientId) {
        const supabase = this.supabaseService.getClient();
        let query = supabase
            .from('service_requests')
            .select(`*`)
            .order('created_at', { ascending: false });
        if (clientId) {
            query = query.eq('client_id', clientId);
        }
        const { data, error } = await query;
        if (error) {
            throw new common_1.HttpException(`Failed to fetch service requests: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // Fetch user data for each service request
        if (data && data.length > 0) {
            const userIds = [...new Set(data.map(sr => sr.client_id))];
            const { data: users } = await supabase
                .from('users')
                .select('id, full_name, email, avatar_url')
                .in('id', userIds);
            // Create a map for quick lookup
            const userMap = new Map(users?.map(u => [u.id, u]) || []);
            // Attach user data to each service request
            return data.map(request => ({
                ...request,
                users: userMap.get(request.client_id) || null,
            }));
        }
        return data;
    }
    async findOne(id) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_requests')
            .select('*')
            .eq('id', id)
            .single();
        if (error || !data) {
            throw new common_1.HttpException('Service request not found', common_1.HttpStatus.NOT_FOUND);
        }
        // Fetch user profile data
        const { data: userProfile } = await supabase
            .from('profiles')
            .select('full_name, email, phone, avatar_url, created_at')
            .eq('id', data.client_id)
            .single();
        // Also fetch from users table as fallback
        const { data: userData } = await supabase
            .from('users')
            .select('full_name, email, created_at')
            .eq('id', data.client_id)
            .single();
        // Combine data, prioritizing profiles over users table
        const combinedUserData = {
            full_name: userProfile?.full_name || userData?.full_name || null,
            email: userProfile?.email || userData?.email || null,
            phone: userProfile?.phone || null,
            avatar_url: userProfile?.avatar_url || null,
            created_at: userProfile?.created_at || userData?.created_at || null,
        };
        return {
            ...data,
            users: combinedUserData,
        };
    }
    async update(id, updateDto) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_requests')
            .update(updateDto)
            .eq('id', id)
            .select()
            .single();
        if (error || !data) {
            throw new common_1.HttpException('Service request not found', common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
    async remove(id) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_requests')
            .delete()
            .eq('id', id);
        if (error || !data) {
            throw new common_1.HttpException('Service request not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: 'Service request deleted successfully' };
    }
    async findByCategory(categoryId) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_requests')
            .select('*')
            .eq('category_id', categoryId)
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.HttpException(`Failed to fetch service requests: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    async findByStatus(status) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_requests')
            .select('*')
            .eq('status', status)
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.HttpException(`Failed to fetch service requests: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    async findForJobListings() {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_requests')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.HttpException(`Failed to fetch service requests: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    async findPublicJobListings() {
        // Use regular client for public job listings
        const supabase = this.supabaseService.getClient();
        // Fetch service requests
        const { data: serviceRequests, error: serviceRequestsError } = await supabase
            .from('service_requests')
            .select('*')
            .order('created_at', { ascending: false });
        if (serviceRequestsError) {
            throw new common_1.HttpException(`Failed to fetch service requests: ${serviceRequestsError.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // Get unique client IDs
        const clientIds = [...new Set(serviceRequests.map(sr => sr.client_id))];
        // Fetch user profile data for all clients
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, full_name, email, phone, avatar_url, created_at')
            .in('id', clientIds);
        // Fetch user data from users table as fallback
        const { data: users } = await supabase
            .from('users')
            .select('id, full_name, email, created_at')
            .in('id', clientIds);
        // Create maps for both data sources
        const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
        const userMap = new Map(users?.map(u => [u.id, u]) || []);
        // Combine the data
        const result = serviceRequests.map(sr => {
            const profile = profileMap.get(sr.client_id);
            const user = userMap.get(sr.client_id);
            return {
                ...sr,
                users: {
                    full_name: profile?.full_name || user?.full_name || null,
                    email: profile?.email || user?.email || null,
                    phone: profile?.phone || null,
                    avatar_url: profile?.avatar_url || null,
                    created_at: profile?.created_at || user?.created_at || null,
                },
            };
        });
        return result;
    }
    // Confirm a booking (client accepts an application, moves to ongoing)
    async confirmBooking(id, userId, token) {
        const supabase = token
            ? this.supabaseService.createUserClient(token)
            : this.supabaseService.getClient();
        // Verify the user is the client who owns this service request
        const { data: serviceRequest, error: fetchError } = await supabase
            .from('service_requests')
            .select('client_id')
            .eq('id', id)
            .single();
        if (fetchError || !serviceRequest) {
            throw new common_1.HttpException('Service request not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (serviceRequest.client_id !== userId) {
            throw new common_1.HttpException('You do not have permission to confirm this booking', common_1.HttpStatus.FORBIDDEN);
        }
        // Update status to 'approved' (ongoing)
        const { data, error } = await supabase
            .from('service_requests')
            .update({
            status: 'approved',
            updated_at: new Date().toISOString(),
        })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to confirm booking: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    // Finish a booking (provider marks service as complete, awaiting payment)
    async finishBooking(id, _providerId, _token) {
        // Use regular client to bypass RLS since we're checking permissions explicitly
        const supabase = this.supabaseService.getClient();
        // Get the service request
        const { data: serviceRequest, error: fetchError } = await supabase
            .from('service_requests')
            .select('*')
            .eq('id', id)
            .single();
        if (fetchError || !serviceRequest) {
            throw new common_1.HttpException('Service request not found', common_1.HttpStatus.NOT_FOUND);
        }
        // Mark as finished by provider (doesn't change status, just sets flag)
        const { data, error } = await supabase
            .from('service_requests')
            .update({
            is_provider_finished: true,
            updated_at: new Date().toISOString(),
        })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to finish booking: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    // Complete a booking (client releases payment, moves to completed)
    async completeBooking(id, clientId, _token) {
        // Use regular client to bypass RLS since we're checking permissions explicitly
        const supabase = this.supabaseService.getClient();
        // Verify the user is the client who owns this service request
        const { data: serviceRequest, error: fetchError } = await supabase
            .from('service_requests')
            .select('client_id')
            .eq('id', id)
            .single();
        if (fetchError || !serviceRequest) {
            throw new common_1.HttpException('Service request not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (serviceRequest.client_id !== clientId) {
            throw new common_1.HttpException('You do not have permission to complete this booking', common_1.HttpStatus.FORBIDDEN);
        }
        // Update status to 'completed'
        const { data, error } = await supabase
            .from('service_requests')
            .update({
            status: 'completed',
            updated_at: new Date().toISOString(),
        })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to complete booking: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
};
exports.ServiceRequestService = ServiceRequestService;
exports.ServiceRequestService = ServiceRequestService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object])
], ServiceRequestService);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceListingModule = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
const service_listing_controller_1 = __webpack_require__(40);
const service_listing_service_1 = __webpack_require__(43);
let ServiceListingModule = class ServiceListingModule {
};
exports.ServiceListingModule = ServiceListingModule;
exports.ServiceListingModule = ServiceListingModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [service_listing_controller_1.ServiceListingController],
        providers: [service_listing_service_1.ServiceListingService, supabase_service_1.SupabaseService],
        exports: [service_listing_service_1.ServiceListingService],
    })
], ServiceListingModule);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceListingController = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const auth_guard_1 = __webpack_require__(18);
const create_service_listing_dto_1 = __webpack_require__(41);
const update_service_listing_dto_1 = __webpack_require__(42);
const service_listing_service_1 = __webpack_require__(43);
let ServiceListingController = class ServiceListingController {
    constructor(serviceListingService) {
        this.serviceListingService = serviceListingService;
    }
    create(createDto, providerId, authHeader) {
        // Extract token from "Bearer <token>"
        const token = authHeader?.replace('Bearer ', '');
        return this.serviceListingService.create(createDto, providerId, token);
    }
    findAll(providerId, excludeProviderId) {
        return this.serviceListingService.findAll(providerId, excludeProviderId);
    }
    findByCategory(categoryId) {
        return this.serviceListingService.findByCategory(categoryId);
    }
    findOne(id) {
        return this.serviceListingService.findOne(id);
    }
    findOneWithDetails(id) {
        return this.serviceListingService.findOneWithDetails(id);
    }
    update(id, updateDto) {
        return this.serviceListingService.update(id, updateDto);
    }
    remove(id) {
        return this.serviceListingService.remove(id);
    }
};
exports.ServiceListingController = ServiceListingController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Body)('providerId')),
    tslib_1.__param(2, (0, common_1.Headers)('authorization')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_service_listing_dto_1.CreateServiceListingDto !== "undefined" && create_service_listing_dto_1.CreateServiceListingDto) === "function" ? _b : Object, String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceListingController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, auth_guard_1.Public)(),
    tslib_1.__param(0, (0, common_1.Query)('providerId')),
    tslib_1.__param(1, (0, common_1.Query)('excludeProviderId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceListingController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('category/:categoryId'),
    tslib_1.__param(0, (0, common_1.Query)('categoryId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceListingController.prototype, "findByCategory", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_guard_1.Public)(),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceListingController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/details'),
    (0, auth_guard_1.Public)(),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceListingController.prototype, "findOneWithDetails", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof update_service_listing_dto_1.UpdateServiceListingDto !== "undefined" && update_service_listing_dto_1.UpdateServiceListingDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceListingController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServiceListingController.prototype, "remove", null);
exports.ServiceListingController = ServiceListingController = tslib_1.__decorate([
    (0, common_1.Controller)('service-listings'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof service_listing_service_1.ServiceListingService !== "undefined" && service_listing_service_1.ServiceListingService) === "function" ? _a : Object])
], ServiceListingController);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateServiceListingDto = void 0;
const tslib_1 = __webpack_require__(7);
const class_validator_1 = __webpack_require__(13);
class CreateServiceListingDto {
}
exports.CreateServiceListingDto = CreateServiceListingDto;
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceListingDto.prototype, "providerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceListingDto.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceListingDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceListingDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], CreateServiceListingDto.prototype, "priceFrom", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], CreateServiceListingDto.prototype, "availabilitySchedule", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateServiceListingDto.prototype, "serviceAreas", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateServiceListingDto.prototype, "images", void 0);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateServiceListingDto = void 0;
const tslib_1 = __webpack_require__(7);
const class_validator_1 = __webpack_require__(13);
class UpdateServiceListingDto {
}
exports.UpdateServiceListingDto = UpdateServiceListingDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceListingDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceListingDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    tslib_1.__metadata("design:type", Number)
], UpdateServiceListingDto.prototype, "priceFrom", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateServiceListingDto.prototype, "availabilitySchedule", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], UpdateServiceListingDto.prototype, "serviceAreas", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], UpdateServiceListingDto.prototype, "images", void 0);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceListingService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const supabase_service_1 = __webpack_require__(9);
let ServiceListingService = class ServiceListingService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    // create listing
    async create(createDto, providerId, token) {
        const supabase = token
            ? this.supabaseService.createUserClient(token)
            : this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_listings')
            .insert({
            provider_id: providerId,
            title: createDto.title,
            description: createDto.description,
            category_id: createDto.categoryId,
            price_from: createDto.priceFrom,
            availability_schedule: createDto.availabilitySchedule,
            service_areas: createDto.serviceAreas,
            images: createDto.images || [],
        })
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to create service listing: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    // find all listings
    async findAll(providerId, excludeProviderId) {
        const supabase = this.supabaseService.getClient();
        let query = supabase
            .from('service_listings')
            .select(`*`)
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        if (providerId) {
            query = query.eq('provider_id', providerId);
        }
        if (excludeProviderId) {
            query = query.neq('provider_id', excludeProviderId);
        }
        const { data, error } = await query;
        if (error) {
            throw new common_1.HttpException(`Failed to fetch service listings: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // Fetch provider and category information for each listing
        if (data && data.length > 0) {
            const providerIds = [
                ...new Set(data.map(listing => listing.provider_id)),
            ];
            const categoryIds = [
                ...new Set(data.map(listing => listing.category_id)),
            ];
            const listingIds = data.map(listing => listing.id);
            const { data: providers } = await supabase
                .from('users')
                .select('id, full_name, avatar_url')
                .in('id', providerIds);
            const { data: categories } = await supabase
                .from('categories')
                .select('id, name')
                .in('id', categoryIds);
            // Fetch ratings for all listings
            const { data: ratings } = await supabase
                .from('service_listing_ratings')
                .select('*')
                .in('service_listing_id', listingIds);
            // Create maps for quick lookup
            const providerMap = new Map(providers?.map(p => [p.id, p]) || []);
            const categoryMap = new Map(categories?.map(c => [c.id, c]) || []);
            const ratingsMap = new Map(ratings?.map(r => [r.service_listing_id, r]) || []);
            // Attach provider, category, and rating data to each listing
            return data.map(listing => ({
                ...listing,
                provider: providerMap.get(listing.provider_id) || null,
                category: categoryMap.get(listing.category_id) || null,
                rating: ratingsMap.get(listing.id)?.average_rating || 0,
                review_count: ratingsMap.get(listing.id)?.review_count || 0,
            }));
        }
        return data;
    }
    // find by id
    async findOne(listingId) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_listings')
            .select('*')
            .eq('id', listingId)
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to fetch service listing: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    // find by id with full details (listing + services + provider + category)
    async findOneWithDetails(listingId) {
        const supabase = this.supabaseService.getClient();
        // Fetch the listing with provider and category data
        const { data: listing, error: listingError } = await supabase
            .from('service_listings')
            .select('*')
            .eq('id', listingId)
            .single();
        if (listingError || !listing) {
            throw new common_1.HttpException(`Failed to fetch service listing: ${listingError?.message}`, common_1.HttpStatus.NOT_FOUND);
        }
        // Fetch provider info
        const { data: provider } = await supabase
            .from('users')
            .select('id, full_name, avatar_url, email, phone, created_at')
            .eq('id', listing.provider_id)
            .single();
        // Fetch category info
        const { data: category } = await supabase
            .from('categories')
            .select('id, name')
            .eq('id', listing.category_id)
            .single();
        // Fetch all services for this listing
        const { data: services } = await supabase
            .from('service_listing_details')
            .select('*')
            .eq('listing_id', listingId)
            .order('created_at', { ascending: true });
        // Fetch rating information for this listing
        const { data: ratingData } = await supabase
            .from('service_listing_ratings')
            .select('*')
            .eq('service_listing_id', listingId)
            .single();
        // Return combined data
        return {
            ...listing,
            provider: provider || null,
            category: category || null,
            services: services || [],
            rating: ratingData?.average_rating || 0,
            review_count: ratingData?.review_count || 0,
        };
    }
    // update listing
    async update(listingId, updateDto) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_listings')
            .update(updateDto)
            .eq('id', listingId)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(`Failed to update service listing: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
    // delete listing
    async remove(listingId) {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase
            .from('service_listings')
            .delete()
            .eq('id', listingId);
        if (error) {
            throw new common_1.HttpException(`Failed to delete service listing: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { message: 'Service listing deleted successfully' };
    }
    // find by category
    async findByCategory(categoryId) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('service_listings')
            .select('*')
            .eq('category_id', categoryId)
            .order('created_at', { ascending: false });
        if (error) {
            throw new common_1.HttpException(`Failed to fetch service listings: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data;
    }
};
exports.ServiceListingService = ServiceListingService;
exports.ServiceListingService = ServiceListingService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object])
], ServiceListingService);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(4);
const auth_guard_1 = __webpack_require__(18);
const supabase_service_1 = __webpack_require__(9);
const user_controller_1 = __webpack_require__(45);
const user_service_1 = __webpack_require__(47);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            supabase_service_1.SupabaseService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(5);
const current_user_decorator_1 = __webpack_require__(26);
const auth_guard_1 = __webpack_require__(18);
const user_dto_1 = __webpack_require__(46);
const user_service_1 = __webpack_require__(47);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    // ============================================
    // OTP ENDPOINTS (Public - No Auth Required)
    // ============================================
    async sendOtp(sendOtpDto) {
        return this.userService.sendOtp(sendOtpDto.phone);
    }
    async verifyOtp(verifyOtpDto) {
        return this.userService.verifyOtp(verifyOtpDto.phone, verifyOtpDto.otp);
    }
    // ============================================
    // AUTHENTICATION ENDPOINTS (Public - No Auth Required)
    // ============================================
    async signUp(signUpDto) {
        return this.userService.signUp(signUpDto);
    }
    async login(loginDto) {
        return this.userService.login(loginDto);
    }
    async createSession(body) {
        return this.userService.createSession(body.userId, body.email, body.password);
    }
    async logout(user) {
        return this.userService.logout(user.id);
    }
    // ============================================
    // USER PROFILE ENDPOINTS (Protected - Auth Required)
    // ============================================
    async getPublicProfile(userId) {
        return this.userService.getPublicProfile(userId);
    }
    async getProfile(userId, user) {
        return this.userService.getProfile(userId, user);
    }
    async updateProfile(userId, updates, user) {
        return this.userService.updateProfile(userId, updates, user);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('send-otp'),
    (0, swagger_1.ApiOperation)({ summary: 'Send OTP verification code to phone' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.SendOtpDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OTP sent successfully',
        schema: {
            example: {
                success: true,
                message: 'OTP sent successfully',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid phone number format' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.SendOtpDto !== "undefined" && user_dto_1.SendOtpDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "sendOtp", null);
tslib_1.__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('verify-otp'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify OTP code and return bearer token for existing users',
    }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.VerifyOtpDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OTP verified successfully. Returns bearer token if user exists.',
        schema: {
            example: {
                success: true,
                message: 'OTP verified successfully',
                userExists: true,
                user: {
                    id: 'uuid',
                    email: 'user@example.com',
                    phone: '09171234567',
                },
                session: {
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired OTP' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof user_dto_1.VerifyOtpDto !== "undefined" && user_dto_1.VerifyOtpDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "verifyOtp", null);
tslib_1.__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new user account and return bearer token',
    }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.SignUpDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Account created successfully with bearer token',
        schema: {
            example: {
                success: true,
                message: 'Account created successfully',
                user: {
                    id: 'uuid',
                    email: 'user@example.com',
                    phone: '09171234567',
                },
                session: {
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Phone not verified or user already exists',
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.SignUpDto !== "undefined" && user_dto_1.SignUpDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login with email and password and receive bearer token',
    }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Logged in successfully with bearer token',
        schema: {
            example: {
                success: true,
                message: 'Logged in successfully',
                user: { id: 'uuid', email: 'user@example.com' },
                session: {
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof user_dto_1.LoginDto !== "undefined" && user_dto_1.LoginDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Post)('create-session'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create session for OTP-verified user and return bearer token',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string', example: 'uuid' },
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: 'password123' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Session created successfully with bearer token',
        schema: {
            example: {
                success: true,
                message: 'Session created successfully',
                session: {
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                user: { id: 'uuid', email: 'user@example.com' },
            },
        },
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createSession", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: 'Logout current user (requires authentication)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Logged out successfully',
        schema: {
            example: {
                success: true,
                message: 'Logged out successfully',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - No valid bearer token',
    }),
    tslib_1.__param(0, (0, current_user_decorator_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
tslib_1.__decorate([
    (0, auth_guard_1.Public)(),
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public user profile by ID (no auth required)' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getPublicProfile", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('profile/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile by ID (requires authentication)' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile retrieved',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - No valid bearer token',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__param(1, (0, current_user_decorator_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Patch)('profile/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile (requires authentication)' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UpdateProfileDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - No valid bearer token',
    }),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, current_user_decorator_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof user_dto_1.UpdateProfileDto !== "undefined" && user_dto_1.UpdateProfileDto) === "function" ? _f : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProfileDto = exports.LoginDto = exports.SignUpDto = exports.VerifyOtpDto = exports.SendOtpDto = void 0;
const tslib_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(13);
// ============================================
// OTP DTOs
// ============================================
class SendOtpDto {
}
exports.SendOtpDto = SendOtpDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: '09171234567' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SendOtpDto.prototype, "phone", void 0);
class VerifyOtpDto {
}
exports.VerifyOtpDto = VerifyOtpDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: '09171234567' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VerifyOtpDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VerifyOtpDto.prototype, "otp", void 0);
// ============================================
// AUTHENTICATION DTOs
// ============================================
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SecurePassword123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Dela Cruz' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: '09171234567' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'client', enum: ['client', 'provider', 'both'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], SignUpDto.prototype, "userType", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SecurePassword123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
// ============================================
// USER PROFILE DTOs
// ============================================
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Juan Dela Cruz' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProfileDto.prototype, "full_name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'https://example.com/avatar.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProfileDto.prototype, "avatar_url", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Software Developer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Manila, Philippines' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProfileDto.prototype, "location", void 0);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(7);
const common_1 = __webpack_require__(3);
const semaphore_service_1 = __webpack_require__(48);
const supabase_service_1 = __webpack_require__(9);
let UserService = class UserService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.semaphoreService = new semaphore_service_1.SemaphoreService();
    }
    // ============================================
    // HELPER METHODS
    // ============================================
    normalizePhoneNumber(phone) {
        let cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('0')) {
            cleaned = '63' + cleaned.substring(1);
        }
        else if (cleaned.startsWith('9')) {
            cleaned = '63' + cleaned;
        }
        else if (!cleaned.startsWith('63')) {
            cleaned = '63' + cleaned;
        }
        return '+' + cleaned;
    }
    // ============================================
    // OTP AUTHENTICATION FLOW
    // ============================================
    async sendOtp(phone) {
        if (!this.semaphoreService.validatePhoneNumber(phone)) {
            throw new common_1.HttpException('Invalid phone number format', common_1.HttpStatus.BAD_REQUEST);
        }
        const normalizedPhone = this.normalizePhoneNumber(phone);
        // Test mode: Use fixed OTP for testing (supports multiple test numbers)
        const testPhone1 = process.env.TEST_PHONE_NUMBER;
        const testPhone2 = process.env.TEST_PHONE_NUMBER_2;
        const testOtp = process.env.TEST_OTP || '123456';
        const isTestMode = (testPhone1 &&
            normalizedPhone === this.normalizePhoneNumber(testPhone1)) ||
            (testPhone2 && normalizedPhone === this.normalizePhoneNumber(testPhone2));
        // Debug: Show what's happening
        if (testPhone1 || testPhone2) {
            // eslint-disable-next-line no-console
            console.log('Test Mode Check:', {
                input: phone,
                normalized: normalizedPhone,
                testPhone1,
                testPhone2,
                matches: isTestMode,
            });
        }
        const otp = isTestMode ? testOtp : this.semaphoreService.generateOTP();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);
        // Save OTP to database
        const { error: dbError } = await this.supabaseService
            .from('otp_verifications')
            .insert({
            phone: normalizedPhone,
            otp_code: otp,
            expires_at: expiresAt.toISOString(),
        });
        if (dbError) {
            console.error('Database error:', dbError);
            throw new common_1.HttpException('Failed to generate OTP', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // Send OTP via SMS (skip for test mode)
        if (!isTestMode) {
            const smsResult = await this.semaphoreService.sendOTP(phone, otp);
            if (!smsResult.success) {
                throw new common_1.HttpException(smsResult.message || 'Failed to send OTP', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return {
            success: true,
            message: isTestMode
                ? 'OTP sent successfully (Test Mode)'
                : 'OTP sent successfully',
        };
    }
    async verifyOtp(phone, otp) {
        const normalizedPhone = this.normalizePhoneNumber(phone);
        // Check all possible phone formats for OTP
        const phoneFormats = [
            normalizedPhone,
            normalizedPhone.substring(1),
            '0' + normalizedPhone.substring(3),
        ];
        let otpRecord = null;
        for (const phoneFormat of phoneFormats) {
            const result = await this.supabaseService
                .from('otp_verifications')
                .select('*')
                .eq('phone', phoneFormat)
                .eq('otp_code', otp)
                .eq('verified', false)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
            if (result.data) {
                otpRecord = result.data;
                break;
            }
        }
        if (!otpRecord) {
            throw new common_1.HttpException('Invalid or expired OTP', common_1.HttpStatus.BAD_REQUEST);
        }
        // Check if OTP expired
        if (new Date(otpRecord.expires_at) < new Date()) {
            throw new common_1.HttpException('OTP has expired', common_1.HttpStatus.BAD_REQUEST);
        }
        // Mark OTP as verified
        await this.supabaseService
            .from('otp_verifications')
            .update({ verified: true })
            .eq('id', otpRecord.id);
        // Check if user exists
        let existingUser = null;
        for (const phoneFormat of phoneFormats) {
            const result = await this.supabaseService
                .from('users')
                .select('id, email, phone, user_type, full_name')
                .eq('phone', phoneFormat)
                .maybeSingle();
            if (result.data) {
                existingUser = result.data;
                break;
            }
        }
        if (existingUser) {
            // Existing user - ensure their email is confirmed
            await this.supabaseService.adminAuth.admin.updateUserById(existingUser.id, { email_confirm: true });
            // For existing users, return their information
            // They should use the login endpoint with their password to get a session token
            return {
                success: true,
                message: 'OTP verified successfully. Please login with your password.',
                userExists: true,
                user: existingUser,
            };
        }
        return {
            success: true,
            message: 'OTP verified successfully. Please complete signup.',
            userExists: false,
            user: null,
        };
    }
    async createSession(userId, email, password) {
        try {
            // First, ensure email is confirmed
            await this.supabaseService.adminAuth.admin.updateUserById(userId, {
                email_confirm: true,
            });
            // Create session using password
            const { data, error } = await this.supabaseService.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                throw new common_1.HttpException('Failed to create session: ' + error.message, common_1.HttpStatus.UNAUTHORIZED);
            }
            return {
                success: true,
                message: 'Session created successfully',
                session: data.session,
                user: data.user,
            };
        }
        catch (error) {
            console.error('Error creating session:', error);
            throw new common_1.HttpException('Failed to create session', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // ============================================
    // USER MANAGEMENT
    // ============================================
    async signUp(signUpDto) {
        const normalizedPhone = this.normalizePhoneNumber(signUpDto.phone);
        // Check if phone is verified
        const { data: verifiedOtp } = await this.supabaseService
            .from('otp_verifications')
            .select('*')
            .eq('phone', normalizedPhone)
            .eq('verified', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        if (!verifiedOtp) {
            throw new common_1.HttpException('Phone number not verified', common_1.HttpStatus.BAD_REQUEST);
        }
        // Create user in Supabase Auth with auto-confirmed email
        const { data: authData, error: signUpError } = await this.supabaseService.auth.signUp({
            email: signUpDto.email,
            password: signUpDto.password,
            options: {
                data: {
                    full_name: signUpDto.fullName,
                    phone: normalizedPhone,
                    user_type: signUpDto.userType,
                },
            },
        });
        if (signUpError) {
            throw new common_1.HttpException(signUpError.message, common_1.HttpStatus.BAD_REQUEST);
        }
        // Auto-confirm email since phone is verified
        if (authData.user) {
            await this.supabaseService.adminAuth.admin.updateUserById(authData.user.id, { email_confirm: true });
            await this.supabaseService
                .from('users')
                .update({ phone_verified: true })
                .eq('id', authData.user.id);
        }
        // Sign in the user to get the session with bearer token
        const { data: loginData, error: loginError } = await this.supabaseService.auth.signInWithPassword({
            email: signUpDto.email,
            password: signUpDto.password,
        });
        if (loginError) {
            // User created but login failed, still return success
            return {
                success: true,
                message: 'Account created successfully. Please login.',
                user: authData.user,
            };
        }
        return {
            success: true,
            message: 'Account created successfully',
            user: loginData.user,
            session: loginData.session,
        };
    }
    async login(loginDto) {
        const { data, error } = await this.supabaseService.auth.signInWithPassword({
            email: loginDto.email,
            password: loginDto.password,
        });
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.UNAUTHORIZED);
        }
        return {
            success: true,
            message: 'Logged in successfully',
            user: data.user,
            session: data.session,
        };
    }
    async logout(userId) {
        // Supabase handles session invalidation automatically
        // We can add additional cleanup here if needed
        // Optional: Mark any user-specific data as logged out
        // For example, update last_logout timestamp
        try {
            await this.supabaseService
                .from('users')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', userId);
        }
        catch (error) {
            // Log error but don't fail the logout
            console.error('Error updating user logout timestamp:', error);
        }
        return {
            success: true,
            message: 'Logged out successfully',
        };
    }
    // ============================================
    // PROFILE MANAGEMENT
    // ============================================
    async getPublicProfile(userId) {
        // Public profile endpoint - returns non-sensitive user information
        const { data, error } = await this.supabaseService
            .from('users')
            .select('id, full_name, avatar_url, email, phone, user_type, created_at')
            .eq('id', userId)
            .single();
        if (error) {
            throw new common_1.HttpException('Failed to fetch user profile', common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
    async getProfile(userId, authenticatedUser) {
        // Users can only access their own profile or admins can access any profile
        if (authenticatedUser.id !== userId) {
            // Check if user is admin (you can add admin check logic here)
            const isAdmin = authenticatedUser.user_metadata?.role === 'admin';
            if (!isAdmin) {
                throw new common_1.ForbiddenException('You can only access your own profile');
            }
        }
        const { data, error } = await this.supabaseService
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            throw new common_1.HttpException('Failed to fetch user profile', common_1.HttpStatus.NOT_FOUND);
        }
        return data;
    }
    async updateProfile(userId, updates, authenticatedUser) {
        // Users can only update their own profile or admins can update any profile
        if (authenticatedUser.id !== userId) {
            // Check if user is admin (you can add admin check logic here)
            const isAdmin = authenticatedUser.user_metadata?.role === 'admin';
            if (!isAdmin) {
                throw new common_1.ForbiddenException('You can only update your own profile');
            }
        }
        const { data, error } = await this.supabaseService
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException('Failed to update profile', common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            message: 'Profile updated successfully',
            user: data,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SemaphoreService = void 0;
class SemaphoreService {
    constructor() {
        this.apiUrl = 'https://api.semaphore.co/api/v4/messages';
        this.apiKey = process.env.SEMAPHORE_API_KEY || '';
        if (!this.apiKey) {
            console.error('SEMAPHORE_API_KEY is not set');
        }
    }
    /**
     * Generate a 6-digit OTP code
     */
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    /**
     * Send OTP via Semaphore SMS
     */
    async sendOTP(phoneNumber, otp) {
        try {
            // Format phone number to PH format (e.g., 639171234567)
            const formattedPhone = this.formatPhoneNumber(phoneNumber);
            const message = `Your HanApp verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`;
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    apikey: this.apiKey,
                    number: formattedPhone,
                    message,
                    sendername: 'HanApp',
                }),
            });
            const data = (await response.json());
            if (response.ok) {
                return {
                    success: true,
                    message: 'OTP sent successfully',
                };
            }
            else {
                return {
                    success: false,
                    message: data.message || 'Failed to send OTP',
                };
            }
        }
        catch (error) {
            console.error('Semaphore API error:', error);
            return {
                success: false,
                message: 'Failed to send OTP. Please try again.',
            };
        }
    }
    /**
     * Format phone number to Philippine format (639XXXXXXXXX)
     */
    formatPhoneNumber(phone) {
        // Remove all non-numeric characters
        let cleaned = phone.replace(/\D/g, '');
        // Handle different formats
        if (cleaned.startsWith('0')) {
            // 09171234567 -> 639171234567
            cleaned = '63' + cleaned.substring(1);
        }
        else if (cleaned.startsWith('9')) {
            // 9171234567 -> 639171234567
            cleaned = '63' + cleaned;
        }
        else if (!cleaned.startsWith('63')) {
            // Add 63 prefix if missing
            cleaned = '63' + cleaned;
        }
        return cleaned;
    }
    /**
     * Validate Philippine phone number format
     */
    validatePhoneNumber(phone) {
        const phoneRegex = /^(09|\+639|639)\d{9}$/;
        return phoneRegex.test(phone);
    }
}
exports.SemaphoreService = SemaphoreService;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable @typescript-eslint/no-var-requires, import/order, import/first */
// Load environment variables before anything else
const dotenv = __webpack_require__(1);
const path = __webpack_require__(2);
// When running from dist folder (npm start), go up one level to find .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// Also try from process.cwd() for nx serve
dotenv.config({ path: path.resolve(process.cwd(), 'apps/api/.env') });
/* eslint-enable @typescript-eslint/no-var-requires, import/order, import/first */
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(5);
const app_module_1 = __webpack_require__(6);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    // Enable validation globally
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    // Enable CORS for Next.js frontend
    const port = process.env.FRONTEND_URL_WEB;
    const port2 = process.env.FRONTEND_URL_WEB_2;
    app.enableCors({
        origin: [port, port2], // Add your frontend URLs
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('HanApp-PH API')
        .setDescription('The HanApp-PH API documentation - Your startup API endpoints')
        .setVersion('1.0')
        .addTag('hanapp', 'Main application endpoints')
        .addTag('health', 'Health check endpoints')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        customSiteTitle: 'HanApp-PH API Docs',
        customfavIcon: '/favicon.ico',
        customCss: `
      .topbar-wrapper .link {
        content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
        width: 120px;
        height: auto;
      }
      .swagger-ui .topbar { background-color: #1976d2; }
    `,
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port3 = process.env.PORT || 3000;
    await app.listen(port3);
    common_1.Logger.log(`Application is running on: http://localhost:${port3}/${globalPrefix}`);
    common_1.Logger.log(`Swagger API Documentation: http://localhost:${port3}/api-docs`);
}
bootstrap();

})();

/******/ })()
;