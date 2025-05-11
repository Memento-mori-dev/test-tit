let modalElement = '[data-js-modal]';

class Modal{
    selectors = {
        modal: modalElement,
        template: '[data-js-modal-template]',
    }

    stateClasses = {
        isOpen: 'is-open',
        isShow: 'is-show',
    }

    constructor(){
        this.modalElement = document.querySelector(this.selectors.modal);
        this.templateArr = [...document.querySelectorAll(this.selectors.template)];
    }

    open(){
        this.modalElement.classList.add(this.stateClasses.isOpen);
    }

    addBlock(nameTemplate){
        let newBlock = this.templateArr.find(template => template.dataset.jsModalTemplate === nameTemplate)?.content.cloneNode(true);

        if (newBlock) {
            this.modalElement.appendChild(newBlock)
        }else{
            console.log(`Модальное окно не найтено ${nameTemplate}`);
        }
    }

    close(){
        this.modalElement.classList.remove(this.stateClasses.isOpen);
        this.destroy();
    }

    destroy(){
        this.modalElement.innerHTML = ''
    }
}

class ModalControlCollection extends Modal{
    constructor(){
        super();
        this.init();
    }

    init(){
        document.querySelectorAll('[data-js-modal-open]').forEach(openModule => {
            openModule.onclick = () => {
                let nameTemplate = openModule.dataset.jsModalOpen;
                super.addBlock(nameTemplate);
                super.open();

                document.querySelector('[data-js-modal-close]').onclick = () => {
                    super.close();
                }
            }
        })

        document.querySelector(modalElement).onclick = (modalEvent) => {
            if (modalEvent.srcElement.classList.contains('modal')) {
                super.close();
            }
        }

    }
}

export default ModalControlCollection;