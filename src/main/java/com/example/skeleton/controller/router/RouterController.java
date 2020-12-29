package com.example.skeleton.controller.router;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RouterController {
    @Value("${app.data.username}")
    String username;

    @Value("${app.data.password}")
    String password;

    @GetMapping(value = "/")
    public String HomePage() {
        return "view/dashboard";
    }

    @GetMapping(value = { "/list", "/list?id={id}&pw={pw}" })
    public String ListPage(HttpServletRequest request, @PathParam("id") String id, @PathParam("pw") String pw) {
        if (id != null && pw != null && username.equals(decodeBase64(id)) && password.equals(decodeBase64(pw))) {
            return "view/list";
        } else {
            return "redirect:/";
        }

    }

    private String decodeBase64(String target) {
        String decodedString = "";
        try {
            // Base64 디코딩 ///////////////////////////////////////////////////
            Decoder decoder = Base64.getDecoder();

            // Decoder#decode(bytes[] src)
            byte[] decodedBytes1 = decoder.decode(target);

            // 디코딩한 문자열을 표시
            decodedString = new String(decodedBytes1, "UTF-8");

        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return decodedString;
    }
}
