// В большинстве случаев наследовать собственные свойства нежелательно, по-
// тому что чаще всего они характерны для конкретного экземпляра и не
// могут повторно использоваться дочерними объектами.

//Родительский конструктор
function Article(){
	this.tags = ['js', 'css'];
}

var article = new Article();

//Объект сообщения в блоге наследует свойства объекта article
//через классический шаблон №1
function BlogPost(){}

BlogPost.prototype = article;
var blog = new BlogPost();
//Обратите внимание, что выше нет необходимости
//использовать выражение "new Article()"
//потому что уже имеется доступный экземпляр

// статическая страница наследует свойства объекта article
// через шаблон заимствования конструктора
function StaticPage(){
	Article.call(this);
}
var page = new StaticPage();

console.log(article.hasOwnProperty('tags'));
console.log(blog.hasOwnProperty('tags'));
console.log(page.hasOwnProperty('tags'));


// В этом фрагменте родительский конструктор Article() наследуется дву-
// мя разными способами. Шаблон
// по умолчанию позволяет объекту blog
// получить доступ к свойству tags через прототип, поэтому он не имеет
// собственного свойства, и функция hasOwnProperty() возвращает false.
// Объект page получает собственное свойство tags, потому что при исполь-
// зовании шаблона
// заимствования конструктора новый объект получает
// копию родительского члена tags (а не ссылку на него).
// Обратите внимание на различия, возникающие при попытке изменить
// значение унаследованного свойства tags:
blog.tags.push('html');
page.tags.push('php');
console.log(article.tags.join(', '));
console.log(blog.tags.join(', '));
console.log(page.tags.join(', '));

// В этом примере предпринимается попытка изменить значение свой-
// ства tags дочернего объекта blog, но при такой организации данных
// одновременно изменяется свойство родительского объекта, потому что
// оба свойства, blog.tags и article.tags, ссылаются на один и тот же мас-
// сив. Попытка изменить значение свойства page.tags не приводит к из-
// менению свойства в родительском объекте article, потому что свойство
// page.tags является отдельной копией, созданной в результате наследо-
// вания.