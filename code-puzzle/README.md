# Puzzle 1: Triangle challenge

## Description

Write a program that will determine the type of a triangle. It should take the lengths of the triangle's three sides as input, and return whether the triangle is equilateral, isosceles or scalene.

## Design

This program is built with three modules

* **code-repository**：Parent project to provide uniform version of java dependency library
* **code-puzzle**：The core library that shared between each module that provide some utility tool/abstract class/interface
* **code-shape**：Tringle challenge small system
* **code-api**：This project is reserved to provide Restful Api for future using

### 1.Basic Library.

* [OVAL - Object Validation Framework](http://oval.sourceforge.net/userguide.html): This framework provide validation in java language to support defensive programming with AOP mode
* [Vert.X](http://vertx.io/docs/): Event Driving Took-kit to implement web application in reactor mode, because it contains Jackson Library, this framework also provide Serialization/Deserialization future for current project.
* [AspectJ](http://www.eclipse.org/aspectj/doc/released/progguide/index.html)：This framework provide complete feature to support put some logical in AOP and it's dependency library that OVAL used.

### 2.Configurations

**Structure**

	/aop/aopaj-test.properties
	/aop/aopaj.properties
	/config/errors.properties
	/config.properties
	/log4j.properties

* **aopaj-test.properties, aopaj.properties**: Both files are required for Maven Mojo AspactJ Plugin, it's used to configure source code that be applied to AspectJ Runtime
* **log4j.properties**：Enable log4j-slf4j
* **config.properties**：Root config file that provide dispatching feature to connect different config files.
![TG](docs/img/tg001.JPG)
* **config/errors.properties**：Provide uniform error format, ( code = pattern ), all errors are defined in this file and could be configured. It's using for Debug or some errors could be put in web response to user.

**Package**

* `org.tscode.aop`：Special package to provide all AOP features
* `org.tscode.cv`：Constant values, all constant values are implemented with Java Interface
* `org.tscode.exp`：All user-defined exceptions are in this package or sub-packages, **AbstractException** is checked abstract exception and most of sub exceptions should be catched.
* `org.tscode.util`：Utility Tools
* `org.tscode.shape`：All abstract shape features include Point, Line, VectorLine, Traingle ( Container ) here.
* `org.puzzle`：All classes for current **Triangle Challenge** Topic only.