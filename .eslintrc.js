// 'off' 或 0 - 关闭规则

// 'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)

// 'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)



module.exports = {

    env: {

        worker: true,

        browser: true,

        commonjs: true,

        jquery: true,

        es6: true

    },

    globals: {
        $Fire: true,
        $UEE: true,
        $Page: true,
        $Controller: true,
        OC: true,
        grpAdUtilCtz: true,
        angular: true,
        adutil: true,
        dontTouchDataOfWholePage: true,
        youCanTouchDataOfWholePage: true,
        encryptWithRSA: true,
        Close_tabSet: true,
        srAdUtilCtz: true,
        VALIDATOR_EXCLUDEDCOMPARE: true,
        iemp: true,
        eview: true,
        $eview: true,
        BRANCH: true,
        showExceptionMessageWindow: true,
        piuACMenu: true,
        define: true,
        VASPOOL: true,
        __inline: true,
        PublicUtil: true,
        isCidr: true,
        cidrAddressIpv6: true,
        transitIp: true,
        isIPv6: true,
        ipv6ToBinary: true,
        initaddr: true,
        addZero: true,
        cidr2IpMask: true,
        maskNum2ip: true,
        num2dot: true,
        ipv6mask_int_to_string: true,
        ipv6_cmp: true,
        getType: true,
        deepClone: true,
        promiseAjax: true,
        cidrRemoveZero: true,
        checkIPv4Subnet: true,
        checkIPv6Subnet: true,
        ip2number: true,
        checkCidr: true,
        checkCidrIPv6: true,
        topology: true,
        InheritUtil: true,
        DrawUtil: true,
        CaculateUtil: true,
        ShadowUtil: true,
        DashedLine: true,
        eviewC: true,
        TopoNode: true,
        TopoLink: true,
        Util: true,
        seajs: true,
        topoCbbQuery: true,
        downloadExcel: true,
        Prel: true,

    },

    extends: 'eslint:recommended',

    parserOptions: {

        sourceType: 'module'

    },

    rules: {
        "esversion": 6,

        'no-self-compare': 2, // 禁止自身比较

        'brace-style': [2, '1tbs', {

            allowSingleLine: true

        }], // if while function 后面的{必须与if在同一行，java风格。

        'no-constant-condition': 0, //禁止在条件中使用常量表达式 if(true) if(1)

        'operator-linebreak': [2, 'before'], // 换行时运算符在行尾还是行首

        'linebreak-style': 0, //强制使用一致的换行风格

        "wrap-regex": 2, //要求正则表达式被括号括起来

        semi: [2, 'always'], // 语句强制分号结尾

        'no-multi-spaces': 1, // 不能用多余的空格

        'no-multiple-empty-lines': [1, {

            'max': 1

        }], //空行最多不能超过2行

        'eqeqeq': 2, // 必须使用全等

        'no-undef': 1, // 不能有未定义的变量

        'no-use-before-define': [2, {

            'functions': false

        }], // 禁止在变量定义之前使用它们

        // "max-statements": [1, 40], //    强制函数块最多允许的的语句数量

        'no-unneeded-ternary': 2, // 禁止可以在有更简单的可替代的表达式时使用三元操作符 var isYes = answer === 1 ? true : false;

        'semi-spacing': [2, {

            before: false,

            after: true

        }], //分号前后空格

        // 注释的斜线和星号后要加空格

        'spaced-comment': [2, 'always', {

            'block': {

                exceptions: ['*'],

                balanced: true

            }

        }],

    },
};