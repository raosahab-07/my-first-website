(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/src/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/client/src/components/theme-provider.tsx",
        lineNumber: 8,
        columnNumber: 12
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/client/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/client/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://yylkfhsabbeolxqclpji.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5bGtmaHNhYmJlb2x4cWNscGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNjQwODQsImV4cCI6MjA4NTc0MDA4NH0.AUw-e6_Z4_KDSFXlZainpvoBhH_P2f7No8hNXm3Vlmw"));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/contexts/VisualConfigContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLOR_PRESETS",
    ()=>COLOR_PRESETS,
    "VisualConfigProvider",
    ()=>VisualConfigProvider,
    "useVisualConfig",
    ()=>useVisualConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
// Default configuration
const DEFAULT_CONFIG = {
    accentColor: '#7C3AED',
    uiMode: 'glass',
    motionVelocity: 'normal',
    brandText: 'Welcome Buddy'
};
const COLOR_PRESETS = [
    {
        name: 'Violet',
        color: '#7C3AED'
    },
    {
        name: 'Emerald',
        color: '#10B981'
    },
    {
        name: 'Amber',
        color: '#F59E0B'
    },
    {
        name: 'Crimson',
        color: '#EF4444'
    },
    {
        name: 'Cyan',
        color: '#06B6D4'
    },
    {
        name: 'Pink',
        color: '#EC4899'
    },
    {
        name: 'Indigo',
        color: '#6366F1'
    },
    {
        name: 'Teal',
        color: '#14B8A6'
    },
    {
        name: 'Orange',
        color: '#F97316'
    },
    {
        name: 'Purple',
        color: '#A855F7'
    }
];
// Create the context
const VisualConfigContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function VisualConfigProvider({ children }) {
    _s();
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_CONFIG);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Apply configuration to CSS variables and global styles with fail-safe behavior
    const applyConfigGlobally = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VisualConfigProvider.useCallback[applyConfigGlobally]": (newConfig)=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                // Apply accent color with validation
                if (/^#[0-9A-F]{6}$/i.test(newConfig.accentColor)) {
                    document.documentElement.style.setProperty('--primary', newConfig.accentColor);
                    document.documentElement.style.setProperty('--color-primary', newConfig.accentColor);
                    document.documentElement.style.setProperty('--color-accent-violet', newConfig.accentColor);
                    // Generate complementary colors
                    const r = parseInt(newConfig.accentColor.slice(1, 3), 16);
                    const g = parseInt(newConfig.accentColor.slice(3, 5), 16);
                    const b = parseInt(newConfig.accentColor.slice(5, 7), 16);
                    const pinkColor = `rgb(${Math.min(255, r + 30)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 10)})`;
                    document.documentElement.style.setProperty('--color-accent-pink', pinkColor);
                    document.documentElement.style.setProperty('--accent-pink', pinkColor);
                    // Set dynamic gradient variables
                    document.documentElement.style.setProperty('--gradient-start', newConfig.accentColor);
                    document.documentElement.style.setProperty('--gradient-end', pinkColor);
                    // Set glow color with alpha channel
                    const glowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
                    document.documentElement.style.setProperty('--glow-color', glowColor);
                }
                // Apply UI mode (glass/solid) with validation
                if (newConfig.uiMode === 'glass' || newConfig.uiMode === 'solid') {
                    document.documentElement.setAttribute('data-ui-mode', newConfig.uiMode);
                }
                // Apply motion velocity with validation
                const validVelocities = [
                    'slow',
                    'normal',
                    'fast'
                ];
                if (validVelocities.includes(newConfig.motionVelocity)) {
                    const durations = {
                        slow: '0.6s',
                        normal: '0.3s',
                        fast: '0.15s'
                    };
                    document.documentElement.style.setProperty('--motion-duration', durations[newConfig.motionVelocity]);
                }
                // Apply brand text (ensure it's not empty)
                if (newConfig.brandText && newConfig.brandText.trim()) {
                // Brand text is consumed by components, not CSS
                }
                // Save to localStorage for immediate availability
                localStorage.setItem('visual-config', JSON.stringify(newConfig));
            } catch (error) {
                console.error('Error applying visual configuration:', error);
                // Apply safe defaults on error
                document.documentElement.setAttribute('data-ui-mode', 'glass');
                document.documentElement.style.setProperty('--primary', '#7C3AED');
                document.documentElement.style.setProperty('--motion-duration', '0.3s');
            }
        }
    }["VisualConfigProvider.useCallback[applyConfigGlobally]"], []);
    // Fetch configuration from database with enhanced fail-safe behavior
    const fetchConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VisualConfigProvider.useCallback[fetchConfig]": async ()=>{
            try {
                setIsLoading(true);
                // Try to get user-specific config first
                const { data: { user }, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                if (authError) {
                    console.warn('Auth error, falling back to localStorage:', authError.message);
                } else if (user?.user_metadata?.visual_config) {
                    const userConfig = user.user_metadata.visual_config;
                    // Validate config structure
                    const validatedConfig = {
                        accentColor: typeof userConfig.accentColor === 'string' && /^#[0-9A-F]{6}$/i.test(userConfig.accentColor) ? userConfig.accentColor : DEFAULT_CONFIG.accentColor,
                        uiMode: userConfig.uiMode === 'glass' || userConfig.uiMode === 'solid' ? userConfig.uiMode : DEFAULT_CONFIG.uiMode,
                        motionVelocity: [
                            'slow',
                            'normal',
                            'fast'
                        ].includes(userConfig.motionVelocity) ? userConfig.motionVelocity : DEFAULT_CONFIG.motionVelocity,
                        brandText: typeof userConfig.brandText === 'string' && userConfig.brandText.trim() ? userConfig.brandText : DEFAULT_CONFIG.brandText
                    };
                    setConfig(validatedConfig);
                    applyConfigGlobally(validatedConfig);
                    return;
                }
                // Check localStorage as fallback
                const localConfig = localStorage.getItem('visual-config');
                if (localConfig) {
                    try {
                        const parsedConfig = JSON.parse(localConfig);
                        // Validate localStorage config
                        const validatedConfig = {
                            accentColor: typeof parsedConfig.accentColor === 'string' && /^#[0-9A-F]{6}$/i.test(parsedConfig.accentColor) ? parsedConfig.accentColor : DEFAULT_CONFIG.accentColor,
                            uiMode: parsedConfig.uiMode === 'glass' || parsedConfig.uiMode === 'solid' ? parsedConfig.uiMode : DEFAULT_CONFIG.uiMode,
                            motionVelocity: [
                                'slow',
                                'normal',
                                'fast'
                            ].includes(parsedConfig.motionVelocity) ? parsedConfig.motionVelocity : DEFAULT_CONFIG.motionVelocity,
                            brandText: typeof parsedConfig.brandText === 'string' && parsedConfig.brandText.trim() ? parsedConfig.brandText : DEFAULT_CONFIG.brandText
                        };
                        setConfig(validatedConfig);
                        applyConfigGlobally(validatedConfig);
                        return;
                    } catch (parseError) {
                        console.warn('Invalid localStorage config, using defaults');
                    }
                }
                // Apply defaults
                setConfig(DEFAULT_CONFIG);
                applyConfigGlobally(DEFAULT_CONFIG);
            } catch (error) {
                console.error('Critical error fetching visual configuration:', error);
                // Apply safe defaults - never break the UI
                setConfig(DEFAULT_CONFIG);
                applyConfigGlobally(DEFAULT_CONFIG);
            } finally{
                setIsLoading(false);
            }
        }
    }["VisualConfigProvider.useCallback[fetchConfig]"], [
        applyConfigGlobally
    ]);
    // Update configuration
    const updateConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VisualConfigProvider.useCallback[updateConfig]": async (newConfig)=>{
            try {
                const updatedConfig = {
                    ...config,
                    ...newConfig
                };
                setConfig(updatedConfig);
                // Apply immediately
                applyConfigGlobally(updatedConfig);
                // Save to database
                const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                if (user) {
                    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.updateUser({
                        data: {
                            visual_config: updatedConfig
                        }
                    });
                    if (error) {
                        throw error;
                    }
                    __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Visual configuration updated successfully');
                }
            } catch (error) {
                console.error('Error updating visual configuration:', error);
                __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to update visual configuration: ' + error.message);
                // Revert to previous config on error
                applyConfigGlobally(config);
            }
        }
    }["VisualConfigProvider.useCallback[updateConfig]"], [
        config,
        applyConfigGlobally
    ]);
    // Reset to defaults
    const resetToDefaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VisualConfigProvider.useCallback[resetToDefaults]": async ()=>{
            try {
                await updateConfig(DEFAULT_CONFIG);
                __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Configuration reset to defaults');
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to reset configuration');
            }
        }
    }["VisualConfigProvider.useCallback[resetToDefaults]"], [
        updateConfig
    ]);
    // Initialize on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualConfigProvider.useEffect": ()=>{
            fetchConfig();
        }
    }["VisualConfigProvider.useEffect"], [
        fetchConfig
    ]);
    // Apply config when it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VisualConfigProvider.useEffect": ()=>{
            if (!isLoading) {
                applyConfigGlobally(config);
            }
        }
    }["VisualConfigProvider.useEffect"], [
        config,
        isLoading,
        applyConfigGlobally
    ]);
    const contextValue = {
        config,
        isLoading,
        updateConfig,
        applyConfigGlobally,
        resetToDefaults
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VisualConfigContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "[project]/client/src/contexts/VisualConfigContext.tsx",
        lineNumber: 256,
        columnNumber: 5
    }, this);
}
_s(VisualConfigProvider, "2g7IrN9qLHt4bZxNGCgBHoUQPXQ=");
_c = VisualConfigProvider;
function useVisualConfig() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(VisualConfigContext);
    if (context === undefined) {
        throw new Error('useVisualConfig must be used within a VisualConfigProvider');
    }
    return context;
}
_s1(useVisualConfig, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "VisualConfigProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$contexts$2f$VisualConfigContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/contexts/VisualConfigContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Providers({ children }) {
    _s();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Providers.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        retry: 1
                    }
                }
            })
    }["Providers.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$contexts$2f$VisualConfigContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualConfigProvider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/client/src/components/providers.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "top-right",
                theme: "dark",
                richColors: true
            }, void 0, false, {
                fileName: "[project]/client/src/components/providers.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/components/providers.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(Providers, "qWUK1JbLJ+XRDCc4mQFRfeVIBp0=");
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=client_src_35f4fab7._.js.map