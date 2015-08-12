var rest = require('restler');
var fs = require('fs');

var host = 'localhost';
var port = '12345';

module.exports = {

   getNotas: function(callback){
      rest.get('http://'+host+':'+port+'/notas/notas/all')
         .on('success', function(data, response){
             callback(data);
         })
         .on('error', function(err, response){
             callback({message:"Erro ao buscar todas as Notas"});
         });
   },

   getFirstNotas: function(callback){
      rest.get("http://"+host+":"+port+"/notas/notas/first/28")
         .on('success', function(data, response){
              callback(data);
         })
         .on('error', function(err, response){
             callback({message:"Erro ao buscar todas as Notas"});
         });
   },

   getNotaVersao: function(codigo,callback){
       rest.get('http://'+host+':'+port+'/notas/notas/'+codigo+'/versao')
          .on('success', function(data, response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao buscar todas as Notas"});
          });
   },

/*
 *     NÃO RETIRE AS LINHAS A SEGUIR...
 *     O RESTLER SÓ FUNCIONA CORRETAMENTE SE OS DADOS FOREM ENVIADOS NESTE FORMATO...
 *     -- PROBLEMA DO RESTLER --
 *
 *     notadata.nota = encodeURIComponent(notadata.nota);
 *     notadata.tags = encodeURIComponent(notadata.tags);
 */

   newNota: function(notadata, callback){
      notadata.nota = encodeURIComponent(notadata.nota);
      notadata.tags = encodeURIComponent(notadata.tags);
      rest.post("http://"+host+":"+port+"/notas/notas/new", {
         multidata: true,
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
        rest.get("http://"+host+":"+port+"/notas/notas/like/"+parameters)
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
        rest.del("http://"+host+":"+port+"/notas/notas/id/"+id)
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
        rest.del("http://"+host+":"+port+"/notas/notas/codigo/"+codigo)
          .on('success', function(data,response){
              callback(data);
          })
          .on('error', function(err, response){
              callback({message:"Erro ao apagar uma nota!!"});
          })
      }
   },

/*
 *     NÃO RETIRE AS LINHAS A SEGUIR...
 *     O RESTLER SÓ FUNCIONA CORRETAMENTE SE OS DADOS FOREM ENVIADOS NESTE FORMATO...
 *     -- PROBLEMA DO RESTLER --
 *
 *     notadata.nota = encodeURIComponent(notadata.nota);
 *     notadata.tags = encodeURIComponent(notadata.tags);
 */

   updateNotaByCodigo: function(codigo, notadata, callback){
      if (codigo!="") {
        notadata.nota = encodeURIComponent(notadata.nota);
        notadata.tags = encodeURIComponent(notadata.tags);
        rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+codigo,{
          multidata: true,
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
          multidata: true,
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
        rest.get("http://"+host+":"+port+"/notas/notas/codigo/like/"+codigo)
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
        rest.get("http://"+host+":"+port+"/notas/notas/codigo/"+codigo)
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
        rest.get("http://"+host+":"+port+"/notas/notas/id/"+id)
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
                   parameters=parameters+"tags="+vector[0].trim();
                   for (var i=1;i<vector.length;i++) {
                      parameters=parameters+"&tags="+vector[i].trim();
                   }
            }
      }

      if (parameters!="") {
            parameters="?"+parameters;
            rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters)
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
                   parameters=parameters+"tags="+vector[0].trim();
                   for (var i=1;i<vector.length;i++) {
                          parameters=parameters+"&tags="+vector[i].trim();
                   }
            }
      }

      if (parameters!="") {
            parameters="?"+parameters;
            rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
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
             parameters=parameters+"tags="+vector[0].trim();
             for (var i=1;i<vector.length;i++) {
                parameters=parameters+"&tags="+vector[i].trim();
             }
          }
       }

       if (parameters!="") {
          parameters="?"+parameters;
            rest.get("http://"+host+":"+port+"/notas/notas/tags/like"+parameters)
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

   getDocumentInfo: function(codigo,doc,callback){
             if (doc !="" && codigo!=""){
                   rest.get("http://"+host+":"+port+"/notas/notas/"+codigo+"/arquivo/"+doc+'/info')
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
                   rest.get("http://"+host+":"+port+"/arquivos/"+doc)
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

   insertDocument: function(doc,callback){
       //TODO - maybe it'll be implemented later
   },

   deleteDocument: function(codigo,doc,callback){
      if ((doc!="") && (codigo!="")) {
             rest.del("http://"+host+":"+port+"/notas/notas/"+codigo+"/arquivo/"+doc)
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

