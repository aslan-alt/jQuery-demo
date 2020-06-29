window.$ = window.jQuery = function (selectorOrArray) {
   
    let elements //重载，如果字符串就
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray

    }
    const api = Object.create(jQuery.prototype)
    Object.assign(api, {
        
        oldApi: selectorOrArray.oldApi,
        elements
    })
    return api
}
jQuery.prototype = {
    constructor:jQuery,
    jQuery: true,
    get(index) {
        return this.elements[index]
    },
    addClass(className) {
        this.elements.forEach(item => item.classList.add(className))
        return this
    },
    each(fn) {

        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    parent() {
        const array = []
        this.each((node) => {
            if (array.indexOf(node.parentNode) < 0) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },
    children() {
        const array = []
        this.each((node) => {
            array.push(...node.children)
        })

        return jQuery(array)
    },
    print() {
        console.log(this.elements)
        return this
    },
    find(selector) {
        let array = []
        this.elements.forEach(item => {
            array = array.concat(Array.from(item.querySelectorAll(selector)))
        })
        array.oldApi = this//把当前的this记录下来，方便下次返回当前this
        return jQuery(array)//返回新的api 方便给查找出的新数组进行链式操作，如果直接返回this 等于在操作原来的上一层数组
    },
    end() {
        return this.oldApi
    }
}


export default jQuery