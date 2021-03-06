var rest = require('restler');
var fs = require('fs');
var host = 'localhost';
var port = '12345';
var info = JSON.parse(fs.readFileSync('../userInfo','utf8'));

module.exports = {

   getNotas: function(callback){
      rest.get('http://'+host+':'+port+'/notas/notas/all',{
              username: info.username,
              password: info.password
         })
         .on('success', function(data, response){
             callback(data);
         })
         .on('error', function(err, response){
             callback({message:"Erro ao buscar todas as Notas"});
         });
   },

   getNotaVersao: function(codigo,callback){
       rest.get('http://'+host+':'+port+'/notas/notas/'+codigo+'/versao',{
              username: info.username,
              password: info.password
          })
          .on('success', function(data, response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao buscar todas as Notas"});
          });
   },

   getFirstNotas: function(callback){
      rest.get("http://"+host+":"+port+"/notas/notas/first/20",{
              username: info.username,
              password: info.password
         })
         .on('success', function(data, response){
              callback(data);
         })
         .on('error', function(err, response){
             callback({message:"Erro ao buscar todas as Notas"});
         });
   },

   newNota: function(notadata, callback){
      notadata.nota = encodeURIComponent(notadata.nota);
      notadata.tags = encodeURIComponent(notadata.tags);
      rest.post("http://"+host+":"+port+"/notas/notas/new", {
         username: info.username,
         password: info.password,
         multipart: true,
         data: notadata
      })
      .on('success', function(data, response){
         callback(data);
      })
      .on('error', function(err, response){
         callback({message:"Erro ao buscar todas as Notas"});
      });
   },

   getNotasLike: function(parameters, callback){
     if (parameters !=""){
        parameters = encodeURIComponent(parameters);
        rest.get("http://"+host+":"+port+"/notas/notas/like/"+parameters,{
            username: info.username,
            password: info.password
          })
          .on('success', function(data,response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao pesquisar uma Nota!!"});
          })
     }
   },

   deleteNotaById: function(id, callback){
      if (id!=""){
        rest.del("http://"+host+":"+port+"/notas/notas/id/"+id,{
            username: info.username,
            password: info.password
          })
          .on('success', function(data,response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao apagar uma nota!!"});
          })
      }
   },

   deleteNotaByCodigo: function(codigo,callback){
      if (codigo!="") {
        rest.del("http://"+host+":"+port+"/notas/notas/codigo/"+codigo,{
            username: info.username,
            password: info.password
          })
          .on('success', function(data,response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao apagar uma nota!!"});
          })
      }
   },

   updateNotaByCodigo: function(codigo, notadata, callback){
      if (codigo!="") {
        notadata.nota = encodeURIComponent(notadata.nota);
        notadata.tags = encodeURIComponent(notadata.tags);
        rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+codigo,{
          username: info.username,
          password: info.password,
          multipart: true,
          data: notadata
        })
        .on('success', function(data,response){
            callback(data);
        })
        .on('error', function(err, response){
            callback({message:"Erro ao atualizar Nota no banco de dados!!"});
        })
      } else {
          callback({message:"Código não informado!!"});
      }
   },

   updateNotaById: function(id,notadata,callback){
      if (id!=""){
        rest.put("http://"+host+":"+port+"/notas/notas/id/"+id,{
          username: info.username,
          password: info.password,
          multipart: true,
          data: notadata
        })
        .on('success', function(data,response){
            callback(data);
        })
        .on('error', function(err, response){
            callback({message:"Erro ao atualizar Nota no banco de dados!!"});
        })
     } else {
          callback({message:"Id não informado!!"});
     }
   },

   getNotaByCodigoLike: function(codigo,callback){
      if (codigo!=""){
        rest.get("http://"+host+":"+port+"/notas/notas/codigo/like/"+codigo,{
              username: info.username,
              password: info.password
          })
          .on('success', function(data,response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao buscar Nota no banco de dados!!"});
          })
      } else {
          callback({message: "Código não informado!!"});
      }
   },

   getNotaByCodigo: function(codigo, callback){
      if (codigo!=""){
        rest.get("http://"+host+":"+port+"/notas/notas/codigo/"+codigo,{
              username: info.username,
              password: info.password
          })
          .on('success', function(data,response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao buscar Nota no banco de dados!!"});
          })
      } else {
          callback({message: "Código não informado!!"});
      }
   },

   getNotaById: function(id, callback){
      if (id!=""){
        rest.get("http://"+host+":"+port+"/notas/notas/id/"+id,{
            username: info.username,
            password: info.password
          })
          .on('success', function(data,response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao buscar Nota no banco de dados!!"});
          })
      } else {
          callback({message:"Identificador não informado!!"});
      }
   },

   getNotasByTagsOr: function(tags, callback){
      var vector = tags.split(",");

      //Coleta todos os campos da busca por tag.
      var parameters = "";
      if (vector instanceof Array){
            if (vector[0] != "") {
                   parameters=parameters+"tags="+encodeURIComponent(vector[0].trim());
                   for (var i=1;i<vector.length;i++) {
                      parameters=parameters+"&tags="+encodeURIComponent(vector[i].trim());
                   }
            }
      }

      if (parameters!="") {
            parameters="?"+parameters;
            rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters,{
                    username: info.username,
                    password: info.password
                })
                .on('success', function(data,response){
                      callback(data);
                })
                .on('error', function(err, response){
                      callback({message:"Erro ao buscar Nota no banco de dados!!"});
                })
      } else {
             callback({message:"Parâmetros não foram definidos corretamente!!"});
      }
   },

   getNotasByTagsAnd: function(tags, callback){
       var vector = tags.split(",");

       //Coleta todos os campos da busca por tag.
       var parameters = "";
       if (vector instanceof Array){
             if (vector[0] != "") {
                   parameters=parameters+"tags="+encodeURIComponent(vector[0].trim());
                   for (var i=1;i<vector.length;i++) {
                          parameters=parameters+"&tags="+encodeURIComponent(vector[i].trim());
                   }
            }
      }

      if (parameters!="") {
            parameters="?"+parameters;
            rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters,{
                  username: info.username,
                  password: info.password
              })
              .on('success', function(data,response){
                callback(data);
              })
              .on('error', function(err, response){
                callback({message:"Erro ao buscar Nota no banco de dados!!"});
              })
      } else {
             callback({message:"Parâmetros não foram definidos corretamente!!"});
      }
   },

   getNotasByTagsLike: function(tags,callback){
       var vector = tags.split(",");

       //Coleta todos os campos da busca por tag.
       var parameters = "";
       if (vector instanceof Array){
          if (vector[0] != "") {
             parameters=parameters+"tags="+encodeURIComponent(vector[0].trim());
             for (var i=1;i<vector.length;i++) {
                   parameters=parameters+"&tags="+encodeURIComponent(vector[i].trim());
             }
          }
       }

       if (parameters!="") {
          parameters="?"+parameters;
            rest.get("http://"+host+":"+port+"/notas/notas/tags/like"+parameters,{
                  username: info.username,
                  password: info.password
              })
              .on('success', function(data,response){
                callback(data);
              })
              .on('error', function(err, response){
                callback({message:"Erro ao buscar Nota no banco de dados!!"});
              })
       } else {
              callback({message:"Parâmetros não foram definidos corretamente!!"});
       }
   },

   getTagsMapReduce: function(callback){
       rest.get("http://"+host+":"+port+"/notas/mapReduce/Tags",{
          username: info.username,
          password: info.password
       })
       .on("success", function(data, response){
             callback(data);
       })
       .on('error', function(err, response){
             callback({message: "Erro ao buscar arquivo!!"});
       })
   },

   getDocumentInfo: function(codigo,doc,callback){
             if (doc !="" && codigo!=""){
                   rest.get("http://"+host+":"+port+"/notas/notas/"+codigo+"/arquivo/"+doc+'/info',{
                        username: info.username,
                        password: info.password
                   })
                   .on('success', function(data,response){
                        callback(data);
                   })
                   .on('error', function(err, response){
                        callback({message:"Erro ao buscar arquivo!!"});
                   })
             } else {
                    callback({message: "Arquivo não foi encontrado!!"});
             }
   },

   getDocument: function(doc, callback){
             if (doc !=""){
                   rest.get("http://"+host+":"+port+"/arquivos/"+doc,{
                        username: info.username,
                        password: info.password
                   })
                   .on('success', function(data,response){
                        callback("http://"+host+":"+port+"/arquivos/"+doc);
                   })
                   .on('error', function(err, response){
                        callback({message:"Erro ao buscar arquivo!!"});
                   })
             } else {
                    callback({message: "Arquivo não foi encontrado!!"});
             }
   },

   insertDocument: function(doc,callback){
       //TODO - maybe it'll be implemented later
   },

   deleteDocument: function(codigo,doc,callback){
      if ((doc!="") && (codigo!="")) {
             rest.del("http://"+host+":"+port+"/notas/notas/"+codigo+"/arquivo/"+doc,{
                username: info.username,
                password: info.password
             })
             .on('success', function(data,response){
                 callback(data);
             })
             .on('error', function(err, response){
                 callback({message:"Erro ao apagar arquivo!!"});
             })
      } else {
             callback({message: "Arquivo não foi encontrado!!"});
      }
   }

};

