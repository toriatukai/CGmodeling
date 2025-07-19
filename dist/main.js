/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
                //23FI121
                //柳平友郎





                class ThreeJSContainer {
                    scene;
                    light;
                    robotParts = {};
                    cloud;
                    activeSparks = [];
                    constructor() {
                    }
                    // 火花を生成するメソッド
                    generateTexture = () => {
                        //新しいキャンバスの作成
                        let canvas = document.createElement('canvas');
                        canvas.width = 16;
                        canvas.height = 16;
                        //円形のグラデーションの作成
                        let context = canvas.getContext('2d'); // nullチェックを追加
                        let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
                        gradient.addColorStop(0, 'rgba(255, 142, 142, 0.9)');
                        gradient.addColorStop(0.2, 'rgb(255, 0, 0)');
                        gradient.addColorStop(0.4, 'rgb(223, 109, 16)');
                        gradient.addColorStop(1, 'rgb(80, 0, 0)');
                        context.fillStyle = gradient;
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        //テクスチャの生成
                        let texture = new three__WEBPACK_IMPORTED_MODULE_4__.Texture(canvas);
                        texture.needsUpdate = true;
                        return texture;
                    };
                    generateLastTexture = () => {
                        //新しいキャンバスの作成
                        let canvas = document.createElement('canvas');
                        canvas.width = 50;
                        canvas.height = 50;
                        //円形のグラデーションの作成
                        let context = canvas.getContext('2d'); // nullチェックを追加
                        let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
                        gradient.addColorStop(0, 'rgba(165, 39, 39, 0.9)');
                        gradient.addColorStop(0.2, 'rgb(255, 0, 0)');
                        gradient.addColorStop(0.4, 'rgb(255, 24, 24)');
                        gradient.addColorStop(1, 'rgb(75, 0, 0)');
                        context.fillStyle = gradient;
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        //テクスチャの生成
                        let texture = new three__WEBPACK_IMPORTED_MODULE_4__.Texture(canvas);
                        texture.needsUpdate = true;
                        return texture;
                    };
                    // 画面部分の作成(表示する枠ごとに)*
                    createRendererDOM = (width, height, cameraPos) => {
                        const renderer = new three__WEBPACK_IMPORTED_MODULE_4__.WebGLRenderer();
                        renderer.setSize(width, height);
                        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_4__.Color(0x000000));
                        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
                        //カメラの設定
                        const camera = new three__WEBPACK_IMPORTED_MODULE_4__.PerspectiveCamera(75, width / height, 0.1, 1000);
                        camera.position.copy(cameraPos);
                        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 7, 0));
                        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement);
                        this.createScene();
                        // 毎フレームのupdateを呼んで，render
                        // reqestAnimationFrame により次フレームを呼ぶ
                        const render = (time) => {
                            orbitControls.update();
                            renderer.render(this.scene, camera);
                            requestAnimationFrame(render);
                        };
                        requestAnimationFrame(render);
                        renderer.domElement.style.cssFloat = "left";
                        renderer.domElement.style.margin = "10px";
                        return renderer.domElement;
                    };
                    // シーンの作成(全体で1回)
                    createScene = async () => {
                        this.scene = new three__WEBPACK_IMPORTED_MODULE_4__.Scene();
                        //this.scene.add(new THREE.AxesHelper(5)); // デバッグ用
                        //  objectのLoad関数
                        const loadOBJ = (objectFilePath, mtlFilePath) => {
                            return new Promise((resolve, reject) => {
                                const mtlLoader = new three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_3__.MTLLoader();
                                mtlLoader.load(mtlFilePath, (materials) => {
                                    materials.preload();
                                    const objLoader = new three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_2__.OBJLoader();
                                    objLoader.setMaterials(materials);
                                    objLoader.load(objectFilePath, (obj) => {
                                        resolve(obj);
                                    });
                                });
                            });
                        };
                        const robotPartNames = [
                            "Robot-4", "Robot-5", "Robot-6", "Robot-0", "Robot-3", "Robot-2", "Robot-1"
                        ];
                        const initialSpawnPositions = {
                            "Robot-0": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, -40, 0),
                            "Robot-1": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 40, 0),
                            "Robot-2": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, -40),
                            "Robot-3": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 40),
                            "Robot-4": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 40, 0),
                            "Robot-5": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, -40, 0),
                            "Robot-6": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, -40, 0)
                        };
                        try {
                            const loadPromises = robotPartNames.map(partName => loadOBJ(`./models/${partName}.obj`, `./models/${partName}.mtl`).then(object => {
                                // ロードしたオブジェクトをthis.robotPartsに保存
                                this.robotParts[partName] = object;
                                object.position.copy(initialSpawnPositions[partName]);
                                this.scene.add(object);
                                return object;
                            }));
                            await Promise.all(loadPromises);
                            // アニメーションロジック
                            const targetPositions = {
                                "Robot-0": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0),
                                "Robot-1": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0),
                                "Robot-2": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0),
                                "Robot-3": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0),
                                "Robot-4": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0),
                                "Robot-5": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0),
                                "Robot-6": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0) // 右足
                            };
                            const firePositions = {
                                "Robot-0": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 2.8, -1.3),
                                "Robot-1": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 6, -0.65),
                                "Robot-2": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 5.6, -1.5),
                                "Robot-3": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 5.6, 0.2),
                                "Robot-4": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0),
                                "Robot-5": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 4, -0.65),
                                "Robot-6": new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 2.8, 0)
                            };
                            let delay = 0; // 開始をずらすための遅延時間
                            const animationDuration = 1500; // アニメーションの長さ
                            let i = 0;
                            robotPartNames.forEach((partName, index) => {
                                const part = this.robotParts[partName];
                                if (part && targetPositions[partName]) {
                                    // 現在の位置から目標位置へアニメーション
                                    const tween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(part.position)
                                        .to(targetPositions[partName], animationDuration)
                                        .delay(delay)
                                        .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Quadratic.Out)
                                        .onComplete(() => {
                                            if (partName != "Robot-4") // 胴体はなし
                                                this.emitSparks(firePositions[partName]); // 火花を生成する
                                            if (index === robotPartNames.length - 1) {
                                                delay += 3000;
                                                this.lastSparks(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-15, 4, 0));
                                            }
                                        });
                                    tween.start();
                                    delay += 2000;
                                }
                            });
                        }
                        catch (error) {
                            console.error("Failed to load one or more robot parts:", error);
                        }
                        //ライトの設定
                        this.light = new three__WEBPACK_IMPORTED_MODULE_4__.DirectionalLight(0xffffff);
                        const lvec = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 1, 1).clone().normalize();
                        this.light.position.set(lvec.x, lvec.y, lvec.z);
                        this.scene.add(this.light);
                        const ambientLight = new three__WEBPACK_IMPORTED_MODULE_4__.AmbientLight(0x404040, 2);
                        this.scene.add(ambientLight);
                        // 毎フレームのupdateを呼んで，更新
                        // reqestAnimationFrame により次フレームを呼ぶ
                        let update = (time) => {
                            requestAnimationFrame(update);
                            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.update();
                            this.updateSparks(time); // 火花アニメーション
                        };
                        requestAnimationFrame(update);
                    };
                    emitSparks = (position) => {
                        const num = 70; // 火花の数
                        const lifeDuration = 600; // 火花の寿命（ms）
                        const spreadSpeed = 0.05; // 火花の飛び散る速さのスケール
                        const geometry = new three__WEBPACK_IMPORTED_MODULE_4__.BufferGeometry();
                        const positions = new Float32Array(num * 3);
                        const initialVelocities = [];
                        for (let i = 0; i < num; i++) {
                            const i3 = i * 3;
                            positions[i3] = position.x;
                            positions[i3 + 1] = position.y;
                            positions[i3 + 2] = position.z;
                            // ランダムな方向と速度で飛び散る
                            const velocity = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2).clone().normalize().clone().multiplyScalar(Math.random() * spreadSpeed + spreadSpeed * 0.5);
                            initialVelocities.push(velocity);
                        }
                        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__.BufferAttribute(positions, 3));
                        const texture = this.generateTexture(); // カスタムテクスチャを使用
                        const material = new three__WEBPACK_IMPORTED_MODULE_4__.PointsMaterial({
                            size: 0.4,
                            map: texture,
                            blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending,
                            transparent: true,
                            depthWrite: false,
                            color: 0xffffff
                        });
                        const sparkPoints = new three__WEBPACK_IMPORTED_MODULE_4__.Points(geometry, material);
                        this.scene.add(sparkPoints);
                        this.activeSparks.push({
                            points: sparkPoints,
                            velocities: initialVelocities,
                            birthTime: performance.now(),
                            lifeDuration: lifeDuration
                        });
                    };
                    lastSparks = (position) => {
                        const num = 400; // 火花の数
                        const lifeDuration = 2000; // 火花の寿命（ms）
                        const spreadSpeed = 0.5; // 火花の飛び散る速さのスケール
                        const geometry = new three__WEBPACK_IMPORTED_MODULE_4__.BufferGeometry();
                        const positions = new Float32Array(num * 3);
                        const initialVelocities = [];
                        for (let i = 0; i < num; i++) {
                            const i3 = i * 3;
                            positions[i3] = position.x;
                            positions[i3 + 1] = position.y;
                            positions[i3 + 2] = position.z;
                            // ランダムな方向と速度で飛び散る
                            const velocity = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2).clone().normalize().clone().multiplyScalar(Math.random() * spreadSpeed + spreadSpeed * 0.5);
                            initialVelocities.push(velocity);
                        }
                        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__.BufferAttribute(positions, 3));
                        const texture = this.generateLastTexture(); // カスタムテクスチャを使用
                        const material = new three__WEBPACK_IMPORTED_MODULE_4__.PointsMaterial({
                            size: 3,
                            map: texture,
                            blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending,
                            transparent: true,
                            depthWrite: false,
                            color: 0xffffff
                        });
                        const sparkPoints = new three__WEBPACK_IMPORTED_MODULE_4__.Points(geometry, material);
                        this.scene.add(sparkPoints);
                        this.activeSparks.push({
                            points: sparkPoints,
                            velocities: initialVelocities,
                            birthTime: performance.now(),
                            lifeDuration: lifeDuration
                        });
                    };
                    updateSparks = (currentTime) => {
                        const sparksToRemove = [];
                        this.activeSparks.forEach((sparkEffect, index) => {
                            const elapsed = currentTime - sparkEffect.birthTime;
                            const lifeRatio = elapsed / sparkEffect.lifeDuration;
                            if (lifeRatio >= 1) {
                                sparksToRemove.push(sparkEffect); // 寿命が尽きたら削除対象に追加
                                return;
                            }
                            // 透明度を徐々に下げる
                            sparkEffect.points.material.opacity = Math.max(0, 1.0 - lifeRatio * 2); // フェードアウトを速める
                            const positions = sparkEffect.points.geometry.attributes.position.array;
                            const velocities = sparkEffect.velocities;
                            // 各火花の位置を更新
                            for (let i = 0; i < velocities.length; i++) {
                                const i3 = i * 3;
                                positions[i3] += velocities[i].x;
                                positions[i3 + 1] += velocities[i].y;
                                positions[i3 + 2] += velocities[i].z;
                                velocities[i].y -= 0.005;
                            }
                            sparkEffect.points.geometry.attributes.position.needsUpdate = true;
                        });
                        sparksToRemove.forEach(sparkEffect => {
                            this.scene.remove(sparkEffect.points);
                            const index = this.activeSparks.indexOf(sparkEffect);
                            if (index > -1) {
                                this.activeSparks.splice(index, 1);
                            }
                            sparkEffect.points.geometry.dispose();
                            sparkEffect.points.material.dispose();
                        });
                    };
                }
                window.addEventListener("DOMContentLoaded", init);
                function init() {
                    let container = new ThreeJSContainer();
                    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(8, 10, -2));
                    document.body.appendChild(viewport);
                }


                /***/
})

        /******/
});
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
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if (chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
                /******/
}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
                        /******/
} else {
/******/ 						fulfilled = false;
/******/ 						if (priority < notFulfilled) notFulfilled = priority;
                        /******/
}
                    /******/
}
/******/ 				if (fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
                    /******/
}
                /******/
}
/******/ 			return result;
            /******/
};
        /******/
})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/
}
                /******/
}
            /******/
};
        /******/
})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
        /******/
})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/
}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
            /******/
};
        /******/
})();
/******/
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
            /******/
};
/******/
/******/ 		// no chunk on demand loading
/******/
/******/ 		// no prefetching
/******/
/******/ 		// no preloaded
/******/
/******/ 		// no HMR
/******/
/******/ 		// no HMR manifest
/******/
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if (chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for (moduleId in moreModules) {
/******/ 					if (__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
                        /******/
}
                    /******/
}
/******/ 				if (runtime) var result = runtime(__webpack_require__);
                /******/
}
/******/ 			if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for (; i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
                    /******/
}
/******/ 				installedChunks[chunkId] = 0;
                /******/
}
/******/ 			return __webpack_require__.O(result);
            /******/
}
/******/
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
        /******/
})();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-caa618"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
    /******/
    /******/
})()
    ;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLzIzRkkxMjFcbi8v5p+z5bmz5Y+L6YOOXG5cblxuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCB7IE9CSkxvYWRlciB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9PQkpMb2FkZXJcIjtcbmltcG9ydCB7IE1UTExvYWRlciB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9NVExMb2FkZXJcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSByb2JvdFBhcnRzOiB7IFtrZXk6IHN0cmluZ106IFRIUkVFLk9iamVjdDNEIH0gPSB7fTtcbiAgICBwcml2YXRlIGNsb3VkOiBUSFJFRS5Qb2ludHM7XG5cblxuICAgIHByaXZhdGUgYWN0aXZlU3BhcmtzOiB7XG4gICAgICAgIHBvaW50czogVEhSRUUuUG9pbnRzO1xuICAgICAgICB2ZWxvY2l0aWVzOiBUSFJFRS5WZWN0b3IzW107XG4gICAgICAgIGJpcnRoVGltZTogbnVtYmVyO1xuICAgICAgICBsaWZlRHVyYXRpb246IG51bWJlcjtcbiAgICB9W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgLy8g54Gr6Iqx44KS55Sf5oiQ44GZ44KL44Oh44K944OD44OJXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVRleHR1cmUgPSAoKTogVEhSRUUuVGV4dHVyZSA9PiB7XG4gICAgICAgIC8v5paw44GX44GE44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gMTY7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSAxNjtcblxuICAgICAgICAvL+WGhuW9ouOBruOCsOODqeODh+ODvOOCt+ODp+ODs+OBruS9nOaIkFxuICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITsgLy8gbnVsbOODgeOCp+ODg+OCr+OCkui/veWKoFxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAwLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAncmdiYSgyNTUsIDE0MiwgMTQyLCAwLjkpJyk7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjIsICdyZ2IoMjU1LCAwLCAwKScpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40LCAncmdiKDIyMywgMTA5LCAxNiknKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICdyZ2IoODAsIDAsIDApJyk7XG5cbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAvL+ODhuOCr+OCueODgeODo+OBrueUn+aIkFxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcyk7XG4gICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGV4dHVyZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlTGFzdFRleHR1cmUgPSAoKTogVEhSRUUuVGV4dHVyZSA9PiB7XG4gICAgICAgIC8v5paw44GX44GE44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXG4gICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gNTA7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSA1MDtcblxuICAgICAgICAvL+WGhuW9ouOBruOCsOODqeODh+ODvOOCt+ODp+ODs+OBruS9nOaIkFxuICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITsgLy8gbnVsbOODgeOCp+ODg+OCr+OCkui/veWKoFxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAwLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAncmdiYSgxNjUsIDM5LCAzOSwgMC45KScpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC4yLCAncmdiKDI1NSwgMCwgMCknKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNCwgJ3JnYigyNTUsIDI0LCAyNCknKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICdyZ2IoNzUsIDAsIDApJyk7XG5cbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAvL+ODhuOCr+OCueODgeODo+OBrueUn+aIkFxuICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKGNhbnZhcyk7XG4gICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGV4dHVyZTtcbiAgICB9XG5cbiAgICAvLyDnlLvpnaLpg6jliIbjga7kvZzmiJAo6KGo56S644GZ44KL5p6g44GU44Go44GrKSpcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy/jgrfjg6Pjg4njgqbjg57jg4Pjg5fjgpLmnInlirnjgavjgZnjgotcblxuICAgICAgICAvL+OCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDcsIDApKTtcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgY29uc3QgcmVuZGVyOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XG5cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgICAgICAvL3RoaXMuc2NlbmUuYWRkKG5ldyBUSFJFRS5BeGVzSGVscGVyKDUpKTsgLy8g44OH44OQ44OD44Kw55SoXG5cbiAgICAgICAgLy8gIG9iamVjdOOBrkxvYWTplqLmlbBcbiAgICAgICAgY29uc3QgbG9hZE9CSiA9IChvYmplY3RGaWxlUGF0aDogc3RyaW5nLCBtdGxGaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxUSFJFRS5PYmplY3QzRD4gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtdGxMb2FkZXIgPSBuZXcgTVRMTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgbXRsTG9hZGVyLmxvYWQobXRsRmlsZVBhdGgsIChtYXRlcmlhbHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzLnByZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqTG9hZGVyID0gbmV3IE9CSkxvYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBvYmpMb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFscyk7XG4gICAgICAgICAgICAgICAgICAgIG9iakxvYWRlci5sb2FkKG9iamVjdEZpbGVQYXRoLCAob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgcm9ib3RQYXJ0TmFtZXMgPSBbXG4gICAgICAgICAgICBcIlJvYm90LTRcIiwgXCJSb2JvdC01XCIsIFwiUm9ib3QtNlwiLCBcIlJvYm90LTBcIiwgXCJSb2JvdC0zXCIsIFwiUm9ib3QtMlwiLCBcIlJvYm90LTFcIlxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IGluaXRpYWxTcGF3blBvc2l0aW9uczogeyBba2V5OiBzdHJpbmddOiBUSFJFRS5WZWN0b3IzIH0gPSB7XG4gICAgICAgICAgICBcIlJvYm90LTBcIjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTQwLCAwKSxcbiAgICAgICAgICAgIFwiUm9ib3QtMVwiOiBuZXcgVEhSRUUuVmVjdG9yMygwLCA0MCwgMCksXG4gICAgICAgICAgICBcIlJvYm90LTJcIjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgLTQwKSxcbiAgICAgICAgICAgIFwiUm9ib3QtM1wiOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCA0MCksXG4gICAgICAgICAgICBcIlJvYm90LTRcIjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgNDAsIDApLFxuICAgICAgICAgICAgXCJSb2JvdC01XCI6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIC00MCwgMCksXG4gICAgICAgICAgICBcIlJvYm90LTZcIjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgLTQwLCAwKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkUHJvbWlzZXMgPSByb2JvdFBhcnROYW1lcy5tYXAocGFydE5hbWUgPT5cbiAgICAgICAgICAgICAgICBsb2FkT0JKKGAuL21vZGVscy8ke3BhcnROYW1lfS5vYmpgLCBgLi9tb2RlbHMvJHtwYXJ0TmFtZX0ubXRsYCkudGhlbihvYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyDjg63jg7zjg4njgZfjgZ/jgqrjg5bjgrjjgqfjgq/jg4jjgpJ0aGlzLnJvYm90UGFydHPjgavkv53lrZhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2JvdFBhcnRzW3BhcnROYW1lXSA9IG9iamVjdDtcblxuICAgICAgICAgICAgICAgICAgICBvYmplY3QucG9zaXRpb24uY29weShpbml0aWFsU3Bhd25Qb3NpdGlvbnNbcGFydE5hbWVdKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChvYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChsb2FkUHJvbWlzZXMpO1xuXG4gICAgICAgICAgICAvLyDjgqLjg4vjg6Hjg7zjgrfjg6fjg7Pjg63jgrjjg4Pjgq9cbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uczogeyBba2V5OiBzdHJpbmddOiBUSFJFRS5WZWN0b3IzIH0gPSB7XG4gICAgICAgICAgICAgICAgXCJSb2JvdC0wXCI6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApLCAvLyDlt6botrNcbiAgICAgICAgICAgICAgICBcIlJvYm90LTFcIjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCksIC8vIOmgrVxuICAgICAgICAgICAgICAgIFwiUm9ib3QtMlwiOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSwgLy8g5bem6IWVXG4gICAgICAgICAgICAgICAgXCJSb2JvdC0zXCI6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApLCAvLyDlj7PohZVcbiAgICAgICAgICAgICAgICBcIlJvYm90LTRcIjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCksIC8vIOiDtOS9k1xuICAgICAgICAgICAgICAgIFwiUm9ib3QtNVwiOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSwgLy8g6IWwXG4gICAgICAgICAgICAgICAgXCJSb2JvdC02XCI6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApICAvLyDlj7PotrNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGZpcmVQb3NpdGlvbnM6IHsgW2tleTogc3RyaW5nXTogVEhSRUUuVmVjdG9yMyB9ID0ge1xuICAgICAgICAgICAgICAgIFwiUm9ib3QtMFwiOiBuZXcgVEhSRUUuVmVjdG9yMygwLCAyLjgsIC0xLjMpLFxuICAgICAgICAgICAgICAgIFwiUm9ib3QtMVwiOiBuZXcgVEhSRUUuVmVjdG9yMygwLCA2LCAtMC42NSksXG4gICAgICAgICAgICAgICAgXCJSb2JvdC0yXCI6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDUuNiwgLTEuNSksXG4gICAgICAgICAgICAgICAgXCJSb2JvdC0zXCI6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDUuNiwgMC4yKSxcbiAgICAgICAgICAgICAgICBcIlJvYm90LTRcIjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCksXG4gICAgICAgICAgICAgICAgXCJSb2JvdC01XCI6IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDQsIC0wLjY1KSxcbiAgICAgICAgICAgICAgICBcIlJvYm90LTZcIjogbmV3IFRIUkVFLlZlY3RvcjMoMCwgMi44LCAwKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IGRlbGF5ID0gMDsgLy8g6ZaL5aeL44KS44Ga44KJ44GZ44Gf44KB44Gu6YGF5bu25pmC6ZaTXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb25EdXJhdGlvbiA9IDE1MDA7IC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OBrumVt+OBlVxuXG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICByb2JvdFBhcnROYW1lcy5mb3JFYWNoKChwYXJ0TmFtZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0ID0gdGhpcy5yb2JvdFBhcnRzW3BhcnROYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAocGFydCAmJiB0YXJnZXRQb3NpdGlvbnNbcGFydE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOePvuWcqOOBruS9jee9ruOBi+OCieebruaomeS9jee9ruOBuOOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0d2VlbiA9IG5ldyBUV0VFTi5Ud2VlbihwYXJ0LnBvc2l0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRhcmdldFBvc2l0aW9uc1twYXJ0TmFtZV0sIGFuaW1hdGlvbkR1cmF0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGF5KGRlbGF5KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNvbXBsZXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFydE5hbWUgIT0gXCJSb2JvdC00XCIpIC8vIOiDtOS9k+OBr+OBquOBl1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRTcGFya3MoZmlyZVBvc2l0aW9uc1twYXJ0TmFtZV0pOyAvLyDngavoirHjgpLnlJ/miJDjgZnjgotcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gcm9ib3RQYXJ0TmFtZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheSArPSAzMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RTcGFya3MobmV3IFRIUkVFLlZlY3RvcjMoLTE1LCA0LCAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHdlZW4uc3RhcnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBkZWxheSArPSAyMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgb25lIG9yIG1vcmUgcm9ib3QgcGFydHM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG4gICAgICAgIGNvbnN0IGFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg0MDQwNDAsIDIpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jOabtOaWsFxuICAgICAgICAvLyByZXFlc3RBbmltYXRpb25GcmFtZSDjgavjgojjgormrKHjg5Xjg6zjg7zjg6DjgpLlkbzjgbZcbiAgICAgICAgbGV0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTcGFya3ModGltZSk7IC8vIOeBq+iKseOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW1pdFNwYXJrcyA9IChwb3NpdGlvbjogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCBudW0gPSA3MDsgLy8g54Gr6Iqx44Gu5pWwXG4gICAgICAgIGNvbnN0IGxpZmVEdXJhdGlvbiA9IDYwMDsgLy8g54Gr6Iqx44Gu5a+/5ZG977yIbXPvvIlcbiAgICAgICAgY29uc3Qgc3ByZWFkU3BlZWQgPSAwLjA1OyAvLyDngavoirHjga7po5vjgbPmlaPjgovpgJ/jgZXjga7jgrnjgrHjg7zjg6tcblxuICAgICAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KG51bSAqIDMpO1xuICAgICAgICBjb25zdCBpbml0aWFsVmVsb2NpdGllczogVEhSRUUuVmVjdG9yM1tdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaTMgPSBpICogMztcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpM10gPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgcG9zaXRpb25zW2kzICsgMV0gPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgcG9zaXRpb25zW2kzICsgMl0gPSBwb3NpdGlvbi56O1xuXG4gICAgICAgICAgICAvLyDjg6njg7Pjg4Djg6DjgarmlrnlkJHjgajpgJ/luqbjgafpo5vjgbPmlaPjgotcbiAgICAgICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMixcbiAgICAgICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyLFxuICAgICAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDJcbiAgICAgICAgICAgICkubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoTWF0aC5yYW5kb20oKSAqIHNwcmVhZFNwZWVkICsgc3ByZWFkU3BlZWQgKiAwLjUpO1xuICAgICAgICAgICAgaW5pdGlhbFZlbG9jaXRpZXMucHVzaCh2ZWxvY2l0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMsIDMpKTtcblxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5nZW5lcmF0ZVRleHR1cmUoKTsgLy8g44Kr44K544K/44Og44OG44Kv44K544OB44Oj44KS5L2/55SoXG5cbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgc2l6ZTogMC40LFxuICAgICAgICAgICAgbWFwOiB0ZXh0dXJlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsIC8vIOWKoOeul+WQiOaIkOOBp+WFieOCi+OCiOOBhuOBq1xuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbG9yOiAweGZmZmZmZlxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzcGFya1BvaW50cyA9IG5ldyBUSFJFRS5Qb2ludHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc3BhcmtQb2ludHMpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlU3BhcmtzLnB1c2goe1xuICAgICAgICAgICAgcG9pbnRzOiBzcGFya1BvaW50cyxcbiAgICAgICAgICAgIHZlbG9jaXRpZXM6IGluaXRpYWxWZWxvY2l0aWVzLFxuICAgICAgICAgICAgYmlydGhUaW1lOiBwZXJmb3JtYW5jZS5ub3coKSxcbiAgICAgICAgICAgIGxpZmVEdXJhdGlvbjogbGlmZUR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGxhc3RTcGFya3MgPSAocG9zaXRpb246IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgY29uc3QgbnVtID0gNDAwOyAvLyDngavoirHjga7mlbBcbiAgICAgICAgY29uc3QgbGlmZUR1cmF0aW9uID0gMjAwMDsgLy8g54Gr6Iqx44Gu5a+/5ZG977yIbXPvvIlcbiAgICAgICAgY29uc3Qgc3ByZWFkU3BlZWQgPSAwLjU7IC8vIOeBq+iKseOBrumjm+OBs+aVo+OCi+mAn+OBleOBruOCueOCseODvOODq1xuXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkobnVtICogMyk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxWZWxvY2l0aWVzOiBUSFJFRS5WZWN0b3IzW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpMyA9IGkgKiAzO1xuICAgICAgICAgICAgcG9zaXRpb25zW2kzXSA9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaTMgKyAxXSA9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaTMgKyAyXSA9IHBvc2l0aW9uLno7XG5cbiAgICAgICAgICAgIC8vIOODqeODs+ODgOODoOOBquaWueWQkeOBqOmAn+W6puOBp+mjm+OBs+aVo+OCi1xuICAgICAgICAgICAgY29uc3QgdmVsb2NpdHkgPSBuZXcgVEhSRUUuVmVjdG9yMyhcbiAgICAgICAgICAgICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyLFxuICAgICAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIsXG4gICAgICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMlxuICAgICAgICAgICAgKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihNYXRoLnJhbmRvbSgpICogc3ByZWFkU3BlZWQgKyBzcHJlYWRTcGVlZCAqIDAuNSk7XG4gICAgICAgICAgICBpbml0aWFsVmVsb2NpdGllcy5wdXNoKHZlbG9jaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSB0aGlzLmdlbmVyYXRlTGFzdFRleHR1cmUoKTsgLy8g44Kr44K544K/44Og44OG44Kv44K544OB44Oj44KS5L2/55SoXG5cbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgc2l6ZTogMyxcbiAgICAgICAgICAgIG1hcDogdGV4dHVyZSxcbiAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLCAvLyDliqDnrpflkIjmiJDjgaflhYnjgovjgojjgYbjgatcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICAgICAgICBjb2xvcjogMHhmZmZmZmZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3BhcmtQb2ludHMgPSBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHNwYXJrUG9pbnRzKTtcblxuICAgICAgICB0aGlzLmFjdGl2ZVNwYXJrcy5wdXNoKHtcbiAgICAgICAgICAgIHBvaW50czogc3BhcmtQb2ludHMsXG4gICAgICAgICAgICB2ZWxvY2l0aWVzOiBpbml0aWFsVmVsb2NpdGllcyxcbiAgICAgICAgICAgIGJpcnRoVGltZTogcGVyZm9ybWFuY2Uubm93KCksXG4gICAgICAgICAgICBsaWZlRHVyYXRpb246IGxpZmVEdXJhdGlvblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSB1cGRhdGVTcGFya3MgPSAoY3VycmVudFRpbWU6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBzcGFya3NUb1JlbW92ZTogdHlwZW9mIHRoaXMuYWN0aXZlU3BhcmtzID0gW107XG5cbiAgICAgICAgdGhpcy5hY3RpdmVTcGFya3MuZm9yRWFjaCgoc3BhcmtFZmZlY3QsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gY3VycmVudFRpbWUgLSBzcGFya0VmZmVjdC5iaXJ0aFRpbWU7XG4gICAgICAgICAgICBjb25zdCBsaWZlUmF0aW8gPSBlbGFwc2VkIC8gc3BhcmtFZmZlY3QubGlmZUR1cmF0aW9uO1xuXG4gICAgICAgICAgICBpZiAobGlmZVJhdGlvID49IDEpIHtcbiAgICAgICAgICAgICAgICBzcGFya3NUb1JlbW92ZS5wdXNoKHNwYXJrRWZmZWN0KTsgLy8g5a+/5ZG944GM5bC944GN44Gf44KJ5YmK6Zmk5a++6LGh44Gr6L+95YqgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDpgI/mmI7luqbjgpLlvpDjgIXjgavkuIvjgZLjgotcbiAgICAgICAgICAgIChzcGFya0VmZmVjdC5wb2ludHMubWF0ZXJpYWwgYXMgVEhSRUUuUG9pbnRzTWF0ZXJpYWwpLm9wYWNpdHkgPSBNYXRoLm1heCgwLCAxLjAgLSBsaWZlUmF0aW8gKiAyKTsgLy8g44OV44Kn44O844OJ44Ki44Km44OI44KS6YCf44KB44KLXG5cbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IHNwYXJrRWZmZWN0LnBvaW50cy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5IGFzIEZsb2F0MzJBcnJheTtcbiAgICAgICAgICAgIGNvbnN0IHZlbG9jaXRpZXMgPSBzcGFya0VmZmVjdC52ZWxvY2l0aWVzO1xuXG4gICAgICAgICAgICAvLyDlkITngavoirHjga7kvY3nva7jgpLmm7TmlrBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVsb2NpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGkzID0gaSAqIDM7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW2kzXSArPSB2ZWxvY2l0aWVzW2ldLng7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25zW2kzICsgMV0gKz0gdmVsb2NpdGllc1tpXS55O1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tpMyArIDJdICs9IHZlbG9jaXRpZXNbaV0uejtcblxuICAgICAgICAgICAgICAgIHZlbG9jaXRpZXNbaV0ueSAtPSAwLjAwNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwYXJrRWZmZWN0LnBvaW50cy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3BhcmtzVG9SZW1vdmUuZm9yRWFjaChzcGFya0VmZmVjdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZShzcGFya0VmZmVjdC5wb2ludHMpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmFjdGl2ZVNwYXJrcy5pbmRleE9mKHNwYXJrRWZmZWN0KTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVTcGFya3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwYXJrRWZmZWN0LnBvaW50cy5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAoc3BhcmtFZmZlY3QucG9pbnRzLm1hdGVyaWFsIGFzIFRIUkVFLlBvaW50c01hdGVyaWFsKS5kaXNwb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoOCwgMTAsIC0yKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3R3ZWVuanNfdHdlZW5fanNfZGlzdF90d2Vlbl9lc21fanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250ci1jYWE2MThcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=