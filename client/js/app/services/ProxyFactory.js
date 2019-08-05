class ProxyFactory {
    //Factories são classes que geram um determinado tipo de objeto
    //Não é uma regra mas se pode criar métodos estáticos para não precisar instanciá-la
    
    static create(objeto, props, acao) {

        return new Proxy(objeto, {

            get(target, prop, receiver) {

                if (props.includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {

                        console.log(`a propriedade "${prop}" foi interceptada`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        })
    }

}