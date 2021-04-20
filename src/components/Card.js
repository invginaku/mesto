export default class Card {
	constructor (data, template, cardClickHandler, deleteButtonHandler, likeHandler) {
		this.data = data;

		this._template = template;
		this._cardClickHandler = cardClickHandler;
		this._deleteButtonHandler = deleteButtonHandler;
		this._likeHandler = likeHandler;

		this.id = data.cardId;
		this._isOwn = data.isOwn;
		this.likes = data.likes;
		this.isLiked = data.isLiked;

		this._name = data.name;
		this._link = data.link;
		this._alt = data.alt;

		this.removeCard = this.removeCard.bind(this);
		this._setLike = this._setLike.bind(this);
		this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
	}

	_getTemplate () {
		const cardElement = document
			.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true);

		return cardElement;
	}

	_setLike () {
		this._likeHandler(this.id, this.isLiked)
			.then(res => {
				this.like.classList.toggle('button_type_like_active');

				this.isLiked = !this.isLiked;
				this.likes = res.likes.length;
				this.cardLikesCounter.textContent = this.likes;
			})
			.catch(err => {
				console.log(`Что-то пошло не так: ${err}`);
			});
	}

	_setEventListeners () {
		const likeButton = this._element.querySelector('.button_type_like');
		likeButton.addEventListener('click', this._setLike);

		const openFullPicButton = this._element.querySelector('.element__photo');
		openFullPicButton.addEventListener('mousedown', () => {this._cardClickHandler(this.data)});
	}

	insertRemoveButton () {
		const label = this._element.querySelector('.element__info');

		label.insertAdjacentHTML('beforebegin',
			'<button class="button_type_urn" type="button"></button>'
		);

		const removeCardButton = this._element.querySelector('.button_type_urn');
		removeCardButton.addEventListener('click', () => {
			this._deleteButtonHandler(this, this.id);
		});
	}

	generateCard () {
		this._element = this._getTemplate();

		const cardElementImage = this._element.querySelector('.element__photo');
		this.like = this._element.querySelector('.button_type_like');
		this.cardLikesCounter = this._element.querySelector('.element__counter');

		this._element.querySelector('.element__text').textContent = this._name;
		cardElementImage.setAttribute('src', this._link);
		this.cardLikesCounter.textContent = this.likes ? this.likes : 0;

		if (this._alt) {
			cardElementImage.setAttribute('alt', this._alt);
		} else {
			cardElementImage.setAttribute('alt', this._name);
		}

		this._setEventListeners();

		if (this._isOwn) { this.insertRemoveButton() }

		if (this.isLiked) { this.like.classList.add('button_type_like_active') }

		return this._element;
	}

	removeCard () {
		this._element.remove();
		this._element = null;
	}
}